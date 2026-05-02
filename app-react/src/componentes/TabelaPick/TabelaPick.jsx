import React from "react";
import LinhaPick from "./LinhaPick";


function TabelaPick({ listaPicks, aoReduzirVida, aoSubir, aoExcluir }) {
    return (
        <section>
            <h1>📋 Tabela Pick</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Vidas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPicks.map((pick, indice) => (
                        <LinhaPick
                            key={indice}
                            indice={indice}
                            nome={pick.nome}
                            vidas={pick.vidas}
                            aoReduzirVida={aoReduzirVida}
                            aoSubir={aoSubir}
                            aoExcluir={aoExcluir}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default TabelaPick