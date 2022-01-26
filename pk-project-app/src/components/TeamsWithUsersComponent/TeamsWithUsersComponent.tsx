import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getUsersByTeamId, getUserTeams } from "../../api/teams";
import { Team } from "./constants";

const TeamsWithUsersComponent = () => {
    const [teams, setTeams] = useState<Team[]>();
    const [teamsWithUsers, setTeamsWithUsers] = useState<Team[]>();

    useEffect(() => {
        getTeamsAndUsers();
    }, [])

    const getTeamsAndUsers = async () => {
        const teamsResult = await getUserTeams();
        setTeams(teamsResult);
        const values = await Promise.all<Team>(teamsResult?.map(async (result: any) => {
            const response = await getUsersByTeamId(result.id);

            return {
                ...result,
                users: response
            }
        }));
        setTeamsWithUsers(values); 
    }

    return (
        <section>
                    <h2>Twoje zespoły:</h2>
                    {teamsWithUsers?.map((team, index) =>
                        <div key={index}>
                            <b>{team.name}</b>
                            <br/>
                            {team.users?.map((user, key) =>
                            <div key={key}>
                                {user.email} <br/>
                        </div>
                            )}
                        </div>
                    )}         
        </section>

    )
}

export default TeamsWithUsersComponent;