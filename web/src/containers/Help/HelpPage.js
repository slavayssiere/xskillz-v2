import React, {Component} from "react";
import {redA400} from "material-ui/styles/colors";
import Stars from "../../components/Skills/Stars";
import Paper from "material-ui/Paper";

const style = {
    margin: '.5em', padding: '10px'
};

export class HelpPage extends Component {
    render() {
        const marginTop = 10;
        return (
            <div>
                <Paper style={style}>
                    <h3>Qu'est-ce qu'une compétence ?</h3>
                    <p style={{marginTop}}>
                        Une compétence représente un savoir, il peut être lié à un outil, à une méthode ou un outil.<br />
                        Les utilisateurs peuvent ajouter n'importe qu'elle compétence. Une fois enregistrée, elle fera partie de la liste proposée aux autres utilisateurs.<br />
						/!\ SVP Evitez de créer des compétences globales à un domaine d’expertise ( Big Data, IA, Sécurité, BDD, TMC, etc…), préférer nommer la technologie ou la méthode (ex : Redshift, AWS DynamoDB, Apache JMeter, etc…).
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>Qu'est-ce qu'un domaine ?</h3>
                    <p style={{marginTop}}>
                        Un domaine est un ensemble de compétences. 
						Seul l'administrateur peux ajouter/supprimer les domaines.<br />Il a également la charge de fusionner des compétences en doublon.
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>Pourquoi certaines cartes de compétences sont quasi transparentes ?</h3>
                    <p style={{marginTop}}>
                        Une carte de compétence s'éclaircie lorsqu'elle ne possède pas le petit <span
                        className="interested-icon" style={{color: redA400}}>&#9829;</span>. Ainsi, les compétences
                        qui intéressent le profil consulté sont mises en avant.
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>Que représentent les <Stars level={1}/> ?</h3>
                    <p style={{marginTop}}>
                        Pour chaque compétence, l'utilisateur est invité à estimer son niveau de connaissance.
                        <br />Chaque entreprise possède sa propre échelle de valeur. Nous pensons qu'une échelle de 0 à 3 est suffisante.
                    </p>
                    <p style={{marginTop}}>
                        Voici l'échelle que nous avons définie chez WeScale :
                    </p>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <Stars level={0}/></td>
                            <td>
                                <b>Sans expérience :</b> mais intéressé(e) par les sujets qui touchent à cette compétence.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Stars level={1}/></td>
                            <td>
                                <b>Débutant(e) :</b> j’ai pratiqué cette compétence sur un projet personnel ou professionnel, mais j’ai encore des choses à apprendre pour la maîtriser.

.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Stars level={2}/></td>
                            <td>
                               <b>Confirmé(e) :</b> j’ai pratiqué cette compétence sur un ou plusieurs projets en <b>Production</b>.

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Stars level={3}/></td>
                            <td>
                                <b>Expert(e) :</b>  Cette compétence n’a pas de secret pour moi et j’en ai fait l'expérience en  <b>Production</b>.<br />Je suis apte à réaliser des <b>audits, des études de performances et à transmettre mes retours d’expérience à nos clients</b>.

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span
                                    className="interested-icon" style={{color: redA400}}>&#9829;</span></td>
                            <td>
                                <b>J’aimerais</b> utiliser cette compétence dans une prochaine mission (indépendant du nombre d'étoiles).
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Paper>

                <Paper style={style}>
                    <h3>Que faire si j'ai oublié mon mot de passe ?</h3>
                    <p style={{marginTop}}>
                        Vous devez contacter un des manageurs.
                    </p>
                </Paper>

                <Paper style={style}>
                    <h3>J'ai trouvé un bug, j'ai une idée, j'ai une question, qui puis-je contacter ?</h3>
                    <p style={{marginTop}}>
                        Vous pouvez ouvrir une demande sur <a
                        href="https://github.com/xebia-france/xskillz-v2/issues" target="blank">Github</a>.
                    </p>
                </Paper>
            </div>
        );
    }
}

export default HelpPage;