"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="max-w-4xl text-center space-y-8 bg-white/70 backdrop-blur-sm p-10 rounded-xl ">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md">
          Sistema de Gestão de Produtos e Avaliações
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          Este sistema foi desenvolvido como parte de um desafio técnico para a
          empresa <strong>DFcom Sistemas</strong>. O objetivo é permitir o
          cadastro, gerenciamento e avaliação de produtos destinados à venda,
          com foco em usabilidade e clareza.
        </p>

        <div className="text-left text-gray-700 space-y-2 text-md bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            🚀 Tecnologias Utilizadas:
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              ⚛️ Frontend: <strong>Next.js 14</strong> (App Router) + React 18
            </li>
            <li>
              🎨 UI: <strong>shadcn/ui</strong> (componentes acessíveis e
              modernos)
            </li>
            <li>
              ✅ Validação de formulários:{" "}
              <strong>React Hook Form + Zod</strong>
            </li>
            <li>
              🔗 Comunicação com API: <strong>Axios</strong>
            </li>
            <li>
              🛠️ Backend: <strong>NestJS + Mongoose + MongoDB</strong>
            </li>
            <li>🌐 Integração full stack via REST API</li>
          </ul>
        </div>

        <p className="text-lg text-gray-700 pt-4">
          Criado por{" "}
          <Link
            href="https://github.com/gleniodev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-blue-700 font-semibold hover:underline">
              Glenio Anderson
            </span>
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
