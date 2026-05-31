import React from "react";
import LinhaPick from "./LinhaPick";


function TabelaPick({
    listaPicks,
    aoReduzirVida,
    aoAdicionarVida,
    aoSubir,
    aoDescer,
    aoMoverParaTopo,
    aoExcluir
}) {
    return (
        <section className="tabela-container">
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
                            aoAdicionarVida={aoAdicionarVida}
                            aoSubir={aoSubir}
                            aoDescer={aoDescer}
                            aoMoverParaTopo={aoMoverParaTopo}
                            aoExcluir={aoExcluir}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default TabelaPick