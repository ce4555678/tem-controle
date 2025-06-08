export const sql = `DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'metodo_pagamento' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."metodo_pagamento" AS ENUM('dinheiro', 'pix', 'cartao_credito', 'cartao_debito', 'transferencia_bancaria', 'boleto', 'outro');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'motivo_movimentacao' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."motivo_movimentacao" AS ENUM('compra', 'ajuste', 'venda', 'perda', 'outro');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_compromisso' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."status_compromisso" AS ENUM('agendado', 'concluido', 'cancelado', 'reagendado');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_conta' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."status_conta" AS ENUM('pendente', 'pago', 'atrasado', 'cancelado');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_orcamento' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."status_orcamento" AS ENUM('pendente', 'aprovado', 'rejeitado', 'expirado', 'cancelado');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_pedido' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."status_pedido" AS ENUM('pendente', 'aprovado', 'em_producao', 'pronto', 'enviado', 'entregue', 'cancelado', 'devolvido');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_categoria_financeira' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."tipo_categoria_financeira" AS ENUM('receita', 'despesa');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_conta' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."tipo_conta" AS ENUM('a_pagar', 'a_receber');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_movimentacao' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."tipo_movimentacao" AS ENUM('entrada', 'saida');
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'unidade_medida' AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')) THEN
        CREATE TYPE "public"."unidade_medida" AS ENUM('un', 'kg', 'g', 'mg', 'l', 'ml', 'm', 'cm', 'mm', 'm²', 'm³', 'cx', 'pct', 'dz', 'par');
    END IF;
END $$;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "agenda" (
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
CREATE TABLE IF NOT EXISTS "categorias_financeiras" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"descricao" text,
	"tipo" "tipo_categoria_financeira" NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
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
CREATE TABLE IF NOT EXISTS "contas_a_pagar_receber" (
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
CREATE TABLE IF NOT EXISTS "estoque" (
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
CREATE TABLE IF NOT EXISTS "orcamento_itens" (
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
CREATE TABLE IF NOT EXISTS "pedido_itens" (
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
CREATE TABLE IF NOT EXISTS "orcamento_servicos" (
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
CREATE TABLE IF NOT EXISTS "pedido_servicos" (
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
CREATE TABLE IF NOT EXISTS "movimentacao_estoque" (
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
CREATE TABLE IF NOT EXISTS "orcamentos" (
	"id" text PRIMARY KEY NOT NULL,
	"cliente_id" text,
	"descricao" text,
	"total_bruto" numeric(10, 2) DEFAULT '0' NOT NULL,
	"data_orcamento" timestamp NOT NULL,
	"validade_orcamento" timestamp,
	"garantia_ate" timestamp,
	"desconto_servico" numeric(10, 2) DEFAULT '0' NOT NULL,
	"desconto_produto" numeric(10, 2) DEFAULT '0',
	"imposto_percentual" numeric(5, 2) DEFAULT '0',
	"imposto_valor" numeric(10, 2) DEFAULT '0',
	"total_liquido" numeric(10, 2) DEFAULT '0' NOT NULL,
	"status" "status_orcamento" DEFAULT 'pendente' NOT NULL,
	"sync" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pedidos" (
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
CREATE TABLE IF NOT EXISTS "servicos" (
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
CREATE TABLE IF NOT EXISTS "transacoes_financeiras" (
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
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'agenda_cliente_id_client_id_fk') THEN
        ALTER TABLE "agenda" ADD CONSTRAINT "agenda_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contas_a_pagar_receber_categoria_id_categorias_financeiras_id_fk') THEN
        ALTER TABLE "contas_a_pagar_receber" ADD CONSTRAINT "contas_a_pagar_receber_categoria_id_categorias_financeiras_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias_financeiras"("id") ON DELETE no action ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contas_a_pagar_receber_cliente_id_client_id_fk') THEN
        ALTER TABLE "contas_a_pagar_receber" ADD CONSTRAINT "contas_a_pagar_receber_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'contas_a_pagar_receber_pedido_id_pedidos_id_fk') THEN
        ALTER TABLE "contas_a_pagar_receber" ADD CONSTRAINT "contas_a_pagar_receber_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orcamento_itens_orcamento_id_orcamentos_id_fk') THEN
        ALTER TABLE "orcamento_itens" ADD CONSTRAINT "orcamento_itens_orcamento_id_orcamentos_id_fk" FOREIGN KEY ("orcamento_id") REFERENCES "public"."orcamentos"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orcamento_itens_estoque_id_estoque_id_fk') THEN
        ALTER TABLE "orcamento_itens" ADD CONSTRAINT "orcamento_itens_estoque_id_estoque_id_fk" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoque"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pedido_itens_pedido_id_pedidos_id_fk') THEN
        ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pedido_itens_estoque_id_estoque_id_fk') THEN
        ALTER TABLE "pedido_itens" ADD CONSTRAINT "pedido_itens_estoque_id_estoque_id_fk" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoque"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orcamento_servicos_orcamento_id_orcamentos_id_fk') THEN
        ALTER TABLE "orcamento_servicos" ADD CONSTRAINT "orcamento_servicos_orcamento_id_orcamentos_id_fk" FOREIGN KEY ("orcamento_id") REFERENCES "public"."orcamentos"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orcamento_servicos_servico_id_servicos_id_fk') THEN
        ALTER TABLE "orcamento_servicos" ADD CONSTRAINT "orcamento_servicos_servico_id_servicos_id_fk" FOREIGN KEY ("servico_id") REFERENCES "public"."servicos"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pedido_servicos_pedido_id_pedidos_id_fk') THEN
        ALTER TABLE "pedido_servicos" ADD CONSTRAINT "pedido_servicos_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pedido_servicos_servico_id_servicos_id_fk') THEN
        ALTER TABLE "pedido_servicos" ADD CONSTRAINT "pedido_servicos_servico_id_servicos_id_fk" FOREIGN KEY ("servico_id") REFERENCES "public"."servicos"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'movimentacao_estoque_estoque_id_estoque_id_fk') THEN
        ALTER TABLE "movimentacao_estoque" ADD CONSTRAINT "movimentacao_estoque_estoque_id_estoque_id_fk" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoque"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'orcamentos_cliente_id_client_id_fk') THEN
        ALTER TABLE "orcamentos" ADD CONSTRAINT "orcamentos_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pedidos_cliente_id_client_id_fk') THEN
        ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transacoes_financeiras_categoria_id_categorias_financeiras_id_fk') THEN
        ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_categoria_id_categorias_financeiras_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias_financeiras"("id") ON DELETE no action ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transacoes_financeiras_pedido_id_pedidos_id_fk') THEN
        ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transacoes_financeiras_cliente_id_client_id_fk') THEN
        ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_cliente_id_client_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."client"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transacoes_financeiras_conta_id_contas_a_pagar_receber_id_fk') THEN
        ALTER TABLE "transacoes_financeiras" ADD CONSTRAINT "transacoes_financeiras_conta_id_contas_a_pagar_receber_id_fk" FOREIGN KEY ("conta_id") REFERENCES "public"."contas_a_pagar_receber"("id") ON DELETE set null ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_search_index" ON "client" USING gin (to_tsvector('portuguese', "nome"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nome_estoque_search_index" ON "estoque" USING gin (to_tsvector('portuguese', "nome"));--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "nome_service_search_index" ON "servicos" USING gin (to_tsvector('portuguese', "nome"));
`;
