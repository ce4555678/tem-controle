// src/db/schema.ts

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

// Função para gerar ID único
const cuid = () => nanoid();

// --- ENUMS ---

export const unidadeMedidaEnum = pgEnum("unidade_medida", [
  "un",
  "kg",
  "g",
  "mg",
  "l",
  "ml",
  "m",
  "cm",
  "mm",
  "m²",
  "m³",
  "cx",
  "pct",
  "dz",
  "par",
]);

export const tipoMovimentacaoEnum = pgEnum("tipo_movimentacao", [
  "entrada",
  "saida",
]);

export const motivoMovimentacaoEnum = pgEnum("motivo_movimentacao", [
  "compra",
  "ajuste",
  "venda",
  "perda",
  "outro",
]);

export const statusPedidoEnum = pgEnum("status_pedido", [
  "pendente",
  "aprovado",
  "em_producao",
  "pronto",
  "enviado",
  "entregue",
  "cancelado",
  "devolvido",
]);

export const statusOrcamentoEnum = pgEnum("status_orcamento", [
  "pendente",
  "aprovado",
  "rejeitado",
  "expirado",
  "cancelado",
]);

export const statusCompromissoEnum = pgEnum("status_compromisso", [
  "agendado",
  "concluido",
  "cancelado",
  "reagendado",
]);

export const tipoCategoriaFinanceiraEnum = pgEnum("tipo_categoria_financeira", [
  "receita",
  "despesa",
]);

export const metodoPagamentoEnum = pgEnum("metodo_pagamento", [
  "dinheiro",
  "pix",
  "cartao_credito",
  "cartao_debito",
  "transferencia_bancaria",
  "boleto",
  "outro",
]);

export const statusContaEnum = pgEnum("status_conta", [
  "pendente",
  "pago",
  "atrasado",
  "cancelado",
]);

export const tipoContaEnum = pgEnum("tipo_conta", ["a_pagar", "a_receber"]);

// --- TIMESTAMPS REUTILIZÁVEIS ---
const timestamps = {
  created_at: timestamp("created_at", { mode: "date" })
    .$default(() => sql`now()`)
    .notNull(),
  updated_at: timestamp("updated_at", { mode: "date" })
    .$default(() => sql`now()`)
    .$onUpdate(() => sql`now()`),
};

// --- TABELAS ---

export const clientesTable = pgTable(
  "client",
  {
    id: text("id").primaryKey().$default(cuid),
    nome: varchar("nome", { length: 100 }).notNull(),
    documento: varchar("documento", { length: 14 }),
    telefone: varchar("telefone", { length: 11 }),
    // Endereço detalhado
    rua: varchar("rua", { length: 255 }),
    numero: varchar("numero", { length: 20 }),
    bairro: varchar("bairro", { length: 100 }),
    cidade: varchar("cidade", { length: 100 }),
    estado: varchar("estado", { length: 50 }),
    cep: varchar("cep", { length: 9 }),
    complemento: varchar("complemento", { length: 255 }), // Opcional: para apto, bloco, etc.
    sync: boolean("sync").notNull().default(false),
    ...timestamps,
  },
  (table) => [
    index("title_search_index").using(
      "gin",
      sql`to_tsvector('portuguese', ${table.nome})`
    ),
  ]
);

export const estoqueTable = pgTable(
  "estoque",
  {
    id: text("id").primaryKey().$default(cuid),
    nome: varchar("nome", { length: 100 }).notNull(),
    sku: varchar("sku", { length: 50 }).notNull(),
    image: varchar({ length: 100 }),
    descricao: text("descricao"),
    quantidade: numeric("quantidade", { precision: 10, scale: 3 })
      .notNull()
      .default("0"),
    unidade: unidadeMedidaEnum("unidade").notNull().default("un"),
    preco_custo: numeric("preco_custo", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    markup: numeric("markup", { precision: 5, scale: 2 }).default("0"),
    preco_venda: numeric("preco_venda", { precision: 10, scale: 2 }).default(
      "0"
    ),
    lucro_percentual: numeric("lucro_percentual", {
      precision: 5,
      scale: 2,
    }).default("0"),
    sync: boolean("sync").notNull().default(false),
    ...timestamps,
  },

  (table) => [
    index("nome_estoque_search_index").using(
      "gin",
      sql`to_tsvector('portuguese', ${table.nome})`
    ),
  ]
);

export const movimentacoesTable = pgTable("movimentacao_estoque", {
  id: text("id").primaryKey().$default(cuid),
  estoque_id: text("estoque_id")
    .notNull()
    .references(() => estoqueTable.id, { onDelete: "cascade" }),
  tipo: tipoMovimentacaoEnum("tipo").notNull(),
  motivo: motivoMovimentacaoEnum("motivo").notNull(),
  quantidade: numeric("quantidade", { precision: 10, scale: 3 })
    .notNull()
    .default("0"),
  observacao: text("observacao"),
  // usuario_id removido, pois o schema é para pglite (sem multiusuário)
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const pedidosTable = pgTable("pedidos", {
  id: text("id").primaryKey().$default(cuid),
  cliente_id: text("cliente_id").references(() => clientesTable.id, {
    onDelete: "set null",
  }),
  descricao: text("descricao"),
  total_bruto: numeric("total_bruto", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  data_orcamento: timestamp("data_orcamento", { mode: "date" })
    .$default(() => sql`now()`)
    .notNull(),
  descontoServico: numeric("desconto_servico", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  descontoProduto: numeric("desconto_produto", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  imposto_percentual: numeric("imposto_percentual", {
    precision: 5,
    scale: 2,
  }).default("0"), // Novo campo para percentual de imposto
  imposto_valor: numeric("imposto_valor", { precision: 10, scale: 2 }).default(
    "0"
  ), // Novo campo para valor de imposto
  total_liquido: numeric("total_liquido", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  status: statusPedidoEnum("status").notNull().default("pendente"),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const orcamentosTable = pgTable("orcamentos", {
  id: text("id").primaryKey().$default(cuid),
  cliente_id: text("cliente_id").references(() => clientesTable.id, {
    onDelete: "set null",
  }),
  descricao: text("descricao"),
  total_bruto: numeric("total_bruto", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  data_orcamento: timestamp("data_orcamento", { mode: "date" })
    .$default(() => sql`now()`)
    .notNull(),
  validade_orcamento: timestamp("validade_orcamento", { mode: "date" }),
  garantia_ate: timestamp("garantia_ate", { mode: "date" }),
  descontoServico: numeric("desconto_servico", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  descontoProduto: numeric("desconto_produto", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  imposto_percentual: numeric("imposto_percentual", {
    precision: 5,
    scale: 2,
  }).default("0"), // Novo campo para percentual de imposto
  imposto_valor: numeric("imposto_valor", { precision: 10, scale: 2 }).default(
    "0"
  ), // Novo campo para valor de imposto
  total_liquido: numeric("total_liquido", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  status: statusOrcamentoEnum("status").notNull().default("pendente"),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const itensPedidoTable = pgTable("pedido_itens", {
  id: text("id").primaryKey().$default(cuid),
  pedido_id: text("pedido_id")
    .notNull()
    .references(() => pedidosTable.id, { onDelete: "cascade" }),
  estoque_id: text("estoque_id").references(() => estoqueTable.id, {
    onDelete: "set null",
  }),
  item_nome: varchar("item_nome", { length: 100 }),
  item_descricao: text("item_descricao"),
  quantidade: numeric("quantidade", { precision: 10, scale: 3 }).notNull(),
  preco_unitario: numeric("preco_unitario", {
    precision: 10,
    scale: 2,
  }).notNull(),
  desconto: numeric("desconto", { precision: 10, scale: 2 }).default("0"),
  total_item: numeric("total_item", { precision: 12, scale: 2 }).notNull(),
  unidade: unidadeMedidaEnum("unidade").notNull(),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const itensOrcamentoTable = pgTable("orcamento_itens", {
  id: text("id").primaryKey().$default(cuid),
  orcamento_id: text("orcamento_id")
    .notNull()
    .references(() => orcamentosTable.id, { onDelete: "cascade" }),
  estoque_id: text("estoque_id").references(() => estoqueTable.id, {
    onDelete: "set null",
  }),
  item_nome: varchar("item_nome", { length: 100 }),
  item_descricao: text("item_descricao"),
  quantidade: numeric("quantidade", { precision: 10, scale: 3 }).notNull(),
  preco_unitario: numeric("preco_unitario", {
    precision: 10,
    scale: 2,
  }).notNull(),
  desconto: numeric("desconto", { precision: 10, scale: 2 }).default("0"),
  total_item: numeric("total_item", { precision: 12, scale: 2 }).notNull(),
  unidade: unidadeMedidaEnum("unidade").notNull(),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const servicosTable = pgTable(
  "servicos",
  {
    id: text("id").primaryKey().$default(cuid),
    nome: varchar("nome", { length: 100 }).notNull(),
    descricao: text("descricao"),
    preco_custo: numeric("preco_custo", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    preco_venda: numeric("preco_venda", { precision: 10, scale: 2 })
      .notNull()
      .default("0"),
    unidade: unidadeMedidaEnum("unidade").notNull().default("un"),
    ativo: boolean("ativo").notNull().default(true),
    sync: boolean("sync").notNull().default(false),
    ...timestamps,
  },
  (table) => [
    index("nome_service_search_index").using(
      "gin",
      sql`to_tsvector('portuguese', ${table.nome})`
    ),
  ]
);

export const itensServicoPedidoTable = pgTable("pedido_servicos", {
  id: text("id").primaryKey().$default(cuid),
  pedido_id: text("pedido_id")
    .notNull()
    .references(() => pedidosTable.id, { onDelete: "cascade" }),
  servico_id: text("servico_id").references(() => servicosTable.id, {
    onDelete: "set null",
  }),
  servico_nome: varchar("servico_nome", { length: 100 }),
  servico_descricao: text("servico_descricao"),
  quantidade: numeric("quantidade", { precision: 10, scale: 3 }).notNull(),
  preco_unitario: numeric("preco_unitario", {
    precision: 10,
    scale: 2,
  }).notNull(),
  desconto: numeric("desconto", { precision: 10, scale: 2 }).default("0"),
  total_item: numeric("total_item", { precision: 12, scale: 2 }).notNull(),
  unidade: unidadeMedidaEnum("unidade").notNull(),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const itensServicoOrcamentoTable = pgTable("orcamento_servicos", {
  id: text("id").primaryKey().$default(cuid),
  orcamento_id: text("orcamento_id")
    .notNull()
    .references(() => orcamentosTable.id, { onDelete: "cascade" }),
  servico_id: text("servico_id").references(() => servicosTable.id, {
    onDelete: "set null",
  }),
  servico_nome: varchar("servico_nome", { length: 100 }),
  servico_descricao: text("servico_descricao"),
  quantidade: numeric("quantidade", { precision: 10, scale: 3 }).notNull(),
  preco_unitario: numeric("preco_unitario", {
    precision: 10,
    scale: 2,
  }).notNull(),
  desconto: numeric("desconto", { precision: 10, scale: 2 }).default("0"),
  total_item: numeric("total_item", { precision: 12, scale: 2 }).notNull(),
  unidade: unidadeMedidaEnum("unidade").notNull(),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const agendaTable = pgTable("agenda", {
  id: text("id").primaryKey().$default(cuid),
  titulo: varchar("titulo", { length: 255 }).notNull(),
  descricao: text("descricao"),
  data_inicio: timestamp("data_inicio", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  data_fim: timestamp("data_fim", { mode: "date", withTimezone: true }),
  cliente_id: text("cliente_id").references(() => clientesTable.id, {
    onDelete: "set null",
  }),
  status: statusCompromissoEnum("status").notNull().default("agendado"),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const categoriasFinanceirasTable = pgTable("categorias_financeiras", {
  id: text("id").primaryKey().$default(cuid),
  nome: varchar("nome", { length: 100 }).notNull(),
  descricao: text("descricao"),
  tipo: tipoCategoriaFinanceiraEnum("tipo").notNull(),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

export const contasAPagarReceberTable = pgTable("contas_a_pagar_receber", {
  id: text("id").primaryKey().$default(cuid),
  descricao: text("descricao").notNull(),
  valor: numeric("valor", { precision: 10, scale: 2 }).notNull(),
  imposto_percentual: numeric("imposto_percentual", {
    precision: 5,
    scale: 2,
  }).default("0"), // Novo campo para percentual de imposto
  imposto_valor: numeric("imposto_valor", { precision: 10, scale: 2 }).default(
    "0"
  ), // Novo campo para valor de imposto
  tipo: tipoContaEnum("tipo").notNull(),
  status: statusContaEnum("status").notNull().default("pendente"),
  data_vencimento: timestamp("data_vencimento", { mode: "date" }).notNull(),
  data_pagamento: timestamp("data_pagamento", { mode: "date" }),
  categoria_id: text("categoria_id")
    .notNull()
    .references(() => categoriasFinanceirasTable.id),
  cliente_id: text("cliente_id").references(() => clientesTable.id, {
    onDelete: "set null",
  }),
  pedido_id: text("pedido_id").references(() => pedidosTable.id, {
    onDelete: "set null",
  }),
  metodo_pagamento: metodoPagamentoEnum("metodo_pagamento"),
  observacoes: text("observacoes"),
  ...timestamps,
});

export const transacoesFinanceirasTable = pgTable("transacoes_financeiras", {
  id: text("id").primaryKey().$default(cuid),
  descricao: text("descricao").notNull(),
  valor: numeric("valor", { precision: 10, scale: 2 }).notNull(),
  tipo: tipoCategoriaFinanceiraEnum("tipo").notNull(),
  data_transacao: timestamp("data_transacao", { mode: "date" })
    .$default(() => sql`now()`)
    .notNull(),
  categoria_id: text("categoria_id")
    .notNull()
    .references(() => categoriasFinanceirasTable.id),
  metodo_pagamento: metodoPagamentoEnum("metodo_pagamento").notNull(),
  pedido_id: text("pedido_id").references(() => pedidosTable.id, {
    onDelete: "set null",
  }),
  cliente_id: text("cliente_id").references(() => clientesTable.id, {
    onDelete: "set null",
  }),
  conta_id: text("conta_id").references(() => contasAPagarReceberTable.id, {
    onDelete: "set null",
  }),
  observacoes: text("observacoes"),
  sync: boolean("sync").notNull().default(false),
  ...timestamps,
});

// =======================================================================================
// RELATIONS
// =======================================================================================

export const clientesRelations = relations(clientesTable, ({ many }) => ({
  pedidos: many(pedidosTable),
  orcamentos: many(orcamentosTable),
  agenda: many(agendaTable),
  contas: many(contasAPagarReceberTable),
  transacoes: many(transacoesFinanceirasTable),
}));

export const estoqueRelations = relations(estoqueTable, ({ many }) => ({
  movimentacoes: many(movimentacoesTable),
  itensPedido: many(itensPedidoTable),
  itensOrcamento: many(itensOrcamentoTable),
}));

export const movimentacoesRelations = relations(
  movimentacoesTable,
  ({ one }) => ({
    estoque: one(estoqueTable, {
      fields: [movimentacoesTable.estoque_id],
      references: [estoqueTable.id],
    }),
  })
);

export const pedidosRelations = relations(pedidosTable, ({ one, many }) => ({
  cliente: one(clientesTable, {
    fields: [pedidosTable.cliente_id],
    references: [clientesTable.id],
  }),
  itens: many(itensPedidoTable),
  servicos: many(itensServicoPedidoTable),
  contas: many(contasAPagarReceberTable),
  transacoes: many(transacoesFinanceirasTable),
}));

export const orcamentosRelations = relations(
  orcamentosTable,
  ({ one, many }) => ({
    cliente: one(clientesTable, {
      fields: [orcamentosTable.cliente_id],
      references: [clientesTable.id],
    }),
    itens: many(itensOrcamentoTable),
    servicos: many(itensServicoOrcamentoTable),
  })
);

export const itensPedidoRelations = relations(itensPedidoTable, ({ one }) => ({
  pedido: one(pedidosTable, {
    fields: [itensPedidoTable.pedido_id],
    references: [pedidosTable.id],
  }),
  estoque: one(estoqueTable, {
    fields: [itensPedidoTable.estoque_id],
    references: [estoqueTable.id],
  }),
}));

export const itensOrcamentoRelations = relations(
  itensOrcamentoTable,
  ({ one }) => ({
    orcamento: one(orcamentosTable, {
      fields: [itensOrcamentoTable.orcamento_id],
      references: [orcamentosTable.id],
    }),
    estoque: one(estoqueTable, {
      fields: [itensOrcamentoTable.estoque_id],
      references: [estoqueTable.id],
    }),
  })
);

export const servicosRelations = relations(servicosTable, ({ many }) => ({
  itensPedido: many(itensServicoPedidoTable),
  itensOrcamento: many(itensServicoOrcamentoTable),
}));

export const itensServicoPedidoRelations = relations(
  itensServicoPedidoTable,
  ({ one }) => ({
    pedido: one(pedidosTable, {
      fields: [itensServicoPedidoTable.pedido_id],
      references: [pedidosTable.id],
    }),
    servico: one(servicosTable, {
      fields: [itensServicoPedidoTable.servico_id],
      references: [servicosTable.id],
    }),
  })
);

export const itensServicoOrcamentoRelations = relations(
  itensServicoOrcamentoTable,
  ({ one }) => ({
    orcamento: one(orcamentosTable, {
      fields: [itensServicoOrcamentoTable.orcamento_id],
      references: [orcamentosTable.id],
    }),
    servico: one(servicosTable, {
      fields: [itensServicoOrcamentoTable.servico_id],
      references: [servicosTable.id],
    }),
  })
);

export const agendaRelations = relations(agendaTable, ({ one }) => ({
  cliente: one(clientesTable, {
    fields: [agendaTable.cliente_id],
    references: [clientesTable.id],
  }),
}));

export const categoriasFinanceirasRelations = relations(
  categoriasFinanceirasTable,
  ({ many }) => ({
    contas: many(contasAPagarReceberTable),
    transacoes: many(transacoesFinanceirasTable),
  })
);

export const contasAPagarReceberRelations = relations(
  contasAPagarReceberTable,
  ({ one, many }) => ({
    categoria: one(categoriasFinanceirasTable, {
      fields: [contasAPagarReceberTable.categoria_id],
      references: [categoriasFinanceirasTable.id],
    }),
    cliente: one(clientesTable, {
      fields: [contasAPagarReceberTable.cliente_id],
      references: [clientesTable.id],
    }),
    pedido: one(pedidosTable, {
      fields: [contasAPagarReceberTable.pedido_id],
      references: [pedidosTable.id],
    }),
    transacoes: many(transacoesFinanceirasTable),
  })
);

export const transacoesFinanceirasRelations = relations(
  transacoesFinanceirasTable,
  ({ one }) => ({
    categoria: one(categoriasFinanceirasTable, {
      fields: [transacoesFinanceirasTable.categoria_id],
      references: [categoriasFinanceirasTable.id],
    }),
    pedido: one(pedidosTable, {
      fields: [transacoesFinanceirasTable.pedido_id],
      references: [pedidosTable.id],
    }),
    cliente: one(clientesTable, {
      fields: [transacoesFinanceirasTable.cliente_id],
      references: [clientesTable.id],
    }),
    conta: one(contasAPagarReceberTable, {
      fields: [transacoesFinanceirasTable.conta_id],
      references: [contasAPagarReceberTable.id],
    }),
  })
);
