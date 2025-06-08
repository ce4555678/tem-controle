CREATE TYPE "public"."metodo_pagamento" AS ENUM('dinheiro', 'pix', 'cartao_credito', 'cartao_debito', 'transferencia_bancaria', 'boleto', 'outro');--> statement-breakpoint
CREATE TYPE "public"."motivo_movimentacao" AS ENUM('compra', 'ajuste', 'venda', 'perda', 'outro');--> statement-breakpoint
CREATE TYPE "public"."status_compromisso" AS ENUM('agendado', 'concluido', 'cancelado', 'reagendado');--> statement-breakpoint
CREATE TYPE "public"."status_conta" AS ENUM('pendente', 'pago', 'atrasado', 'cancelado');--> statement-breakpoint
CREATE TYPE "public"."status_orcamento" AS ENUM('pendente', 'aprovado', 'rejeitado', 'expirado', 'cancelado');--> statement-breakpoint
CREATE TYPE "public"."status_pedido" AS ENUM('pendente', 'aprovado', 'em_producao', 'pronto', 'enviado', 'entregue', 'cancelado', 'devolvido');--> statement-breakpoint
CREATE TYPE "public"."tipo_categoria_financeira" AS ENUM('receita', 'despesa');--> statement-breakpoint
CREATE TYPE "public"."tipo_conta" AS ENUM('a_pagar', 'a_receber');--> statement-breakpoint
CREATE TYPE "public"."tipo_movimentacao" AS ENUM('entrada', 'saida');--> statement-breakpoint
CREATE TYPE "public"."unidade_medida" AS ENUM('un', 'kg', 'g', 'mg', 'l', 'ml', 'm', 'cm', 'mm', 'm²', 'm³', 'cx', 'pct', 'dz', 'par');--> statement-breakpoint
CREATE TABLE "agenda" (
	"id" text PRIMARY KEY NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"descricao" text,
	"data_inicio" timestamp with time zone NOT NULL,
	"data_fim" timestamp with time zone,
	"cliente_id" text,
	"status" "status_compromisso" DEFAULT 'agendado' NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "categorias_financeiras" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"descricao" text,
	"tipo" "tipo_categoria_financeira" NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "client" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"documento" varchar(14),
	"telefone" varchar(11),
	"rua" varchar(255),
	"numero" varchar(20),
	"bairro" varchar(100),
	"cidade" varchar(100),
	"estado" varchar(50),
	"cep" varchar(9),
	"complemento" varchar(255),
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "contas_a_pagar_receber" (
	"id" text PRIMARY KEY NOT NULL,
	"descricao" text NOT NULL,
	"valor" numeric(10, 2) NOT NULL,
	"imposto_percentual" numeric(5, 2) DEFAULT '0',
	"imposto_valor" numeric(10, 2) DEFAULT '0',
	"tipo" "tipo_conta" NOT NULL,
	"status" "status_conta" DEFAULT 'pendente' NOT NULL,
	"data_vencimento" timestamp NOT NULL,
	"data_pagamento" timestamp,
	"categoria_id" text NOT NULL,
	"cliente_id" text,
	"pedido_id" text,
	"metodo_pagamento" "metodo_pagamento",
	"observacoes" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "estoque" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"sku" varchar(50) NOT NULL,
	"image" varchar(100),
	"descricao" text,
	"quantidade" numeric(10, 3) DEFAULT '0' NOT NULL,
	"unidade" "unidade_medida" DEFAULT 'un' NOT NULL,
	"preco_custo" numeric(10, 2) DEFAULT '0' NOT NULL,
	"markup" numeric(5, 2) DEFAULT '0',
	"preco_venda" numeric(10, 2) DEFAULT '0',
	"lucro_percentual" numeric(5, 2) DEFAULT '0',
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "orcamento_itens" (
	"id" text PRIMARY KEY NOT NULL,
	"orcamento_id" text NOT NULL,
	"estoque_id" text,
	"item_nome" varchar(100),
	"item_descricao" text,
	"quantidade" numeric(10, 3) NOT NULL,
	"preco_unitario" numeric(10, 2) NOT NULL,
	"desconto" numeric(10, 2) DEFAULT '0',
	"total_item" numeric(12, 2) NOT NULL,
	"unidade" "unidade_medida" NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pedido_itens" (
	"id" text PRIMARY KEY NOT NULL,
	"pedido_id" text NOT NULL,
	"estoque_id" text,
	"item_nome" varchar(100),
	"item_descricao" text,
	"quantidade" numeric(10, 3) NOT NULL,
	"preco_unitario" numeric(10, 2) NOT NULL,
	"desconto" numeric(10, 2) DEFAULT '0',
	"total_item" numeric(12, 2) NOT NULL,
	"unidade" "unidade_medida" NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "orcamento_servicos" (
	"id" text PRIMARY KEY NOT NULL,
	"orcamento_id" text NOT NULL,
	"servico_id" text,
	"servico_nome" varchar(100),
	"servico_descricao" text,
	"quantidade" numeric(10, 3) NOT NULL,
	"preco_unitario" numeric(10, 2) NOT NULL,
	"desconto" numeric(10, 2) DEFAULT '0',
	"total_item" numeric(12, 2) NOT NULL,
	"unidade" "unidade_medida" NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pedido_servicos" (
	"id" text PRIMARY KEY NOT NULL,
	"pedido_id" text NOT NULL,
	"servico_id" text,
	"servico_nome" varchar(100),
	"servico_descricao" text,
	"quantidade" numeric(10, 3) NOT NULL,
	"preco_unitario" numeric(10, 2) NOT NULL,
	"desconto" numeric(10, 2) DEFAULT '0',
	"total_item" numeric(12, 2) NOT NULL,
	"unidade" "unidade_medida" NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "movimentacao_estoque" (
	"id" text PRIMARY KEY NOT NULL,
	"estoque_id" text NOT NULL,
	"tipo" "tipo_movimentacao" NOT NULL,
	"motivo" "motivo_movimentacao" NOT NULL,
	"quantidade" numeric(10, 3) DEFAULT '0' NOT NULL,
	"observacao" text,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "orcamentos" (
	"id" text PRIMARY KEY NOT NULL,
	"cliente_id" text,
	"descricao" text,
	"total_bruto" numeric(10, 2) DEFAULT '0' NOT NULL,
	"data_orcamento" timestamp NOT NULL,
	"validade_orcamento" timestamp,
	"garantia_ate" timestamp,
	"desconto_servico" numeric(10, 2) DEFAULT '0' NOT NULL,
	"desconto_produto" numeric(10, 2) DEFAULT '0' NOT NULL,
	"imposto_percentual" numeric(5, 2) DEFAULT '0',
	"imposto_valor" numeric(10, 2) DEFAULT '0',
	"total_liquido" numeric(10, 2) DEFAULT '0' NOT NULL,
	"status" "status_orcamento" DEFAULT 'pendente' NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "pedidos" (
	"id" text PRIMARY KEY NOT NULL,
	"cliente_id" text,
	"descricao" text,
	"total_bruto" numeric(10, 2) DEFAULT '0' NOT NULL,
	"data_orcamento" timestamp NOT NULL,
	"desconto_servico" numeric(10, 2) DEFAULT '0' NOT NULL,
	"desconto_produto" numeric(10, 2) DEFAULT '0' NOT NULL,
	"imposto_percentual" numeric(5, 2) DEFAULT '0',
	"imposto_valor" numeric(10, 2) DEFAULT '0',
	"total_liquido" numeric(10, 2) DEFAULT '0' NOT NULL,
	"status" "status_pedido" DEFAULT 'pendente' NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "servicos" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"descricao" text,
	"preco_custo" numeric(10, 2) DEFAULT '0' NOT NULL,
	"preco_venda" numeric(10, 2) DEFAULT '0' NOT NULL,
	"unidade" "unidade_medida" DEFAULT 'un' NOT NULL,
	"ativo" boolean DEFAULT true NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "transacoes_financeiras" (
	"id" text PRIMARY KEY NOT NULL,
	"descricao" text NOT NULL,
	"valor" numeric(10, 2) NOT NULL,
	"tipo" "tipo_categoria_financeira" NOT NULL,
	"data_transacao" timestamp NOT NULL,
	"categoria_id" text NOT NULL,
	"metodo_pagamento" "metodo_pagamento" NOT NULL,
	"pedido_id" text,
	"cliente_id" text,
	"conta_id" text,
	"observacoes" text,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "agenda" ADD CONSTRAINT "agenda_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_a_pagar_receber" ADD CONSTRAINT "contas_a_pagar_receber_categoria_id_categorias_financeiras_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias_financeiras"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_a_pagar_receber" ADD CONSTRAINT "contas_a_pagar_receber_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contas_a_pagar_receber" ADD CONSTRAINT "contas_a_pagar_receber_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orcamento_itens" ADD CONSTRAINT "orcamento_itens_orcamento_id_orcamentos_id_fk" FOREIGN KEY ("orcamento_id") REFERENCES "public"."orcamentos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orcamento_itens" ADD CONSTRAINT "orcamento_itens_estoque_id_estoque_id_fk" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoque"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_estoque_id_estoque_id_fk" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoque"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orcamento_servicos" ADD CONSTRAINT "orcamento_servicos_orcamento_id_orcamentos_id_fk" FOREIGN KEY ("orcamento_id") REFERENCES "public"."orcamentos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orcamento_servicos" ADD CONSTRAINT "orcamento_servicos_servico_id_servicos_id_fk" FOREIGN KEY ("servico_id") REFERENCES "public"."servicos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedido_servicos" ADD CONSTRAINT "pedido_servicos_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedido_servicos" ADD CONSTRAINT "pedido_servicos_servico_id_servicos_id_fk" FOREIGN KEY ("servico_id") REFERENCES "public"."servicos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movimentacao_estoque" ADD CONSTRAINT "movimentacao_estoque_estoque_id_estoque_id_fk" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoque"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orcamentos" ADD CONSTRAINT "orcamentos_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_categoria_id_categorias_financeiras_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias_financeiras"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_conta_id_contas_a_pagar_receber_id_fk" FOREIGN KEY ("conta_id") REFERENCES "public"."contas_a_pagar_receber"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "title_search_index" ON "client" USING gin (to_tsvector('portuguese', "nome"));--> statement-breakpoint
CREATE INDEX "nome_estoque_search_index" ON "estoque" USING gin (to_tsvector('portuguese', "nome"));--> statement-breakpoint
CREATE INDEX "nome_service_search_index" ON "servicos" USING gin (to_tsvector('portuguese', "nome"));