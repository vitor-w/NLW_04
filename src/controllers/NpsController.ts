import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/*
1 2 3 4 5 6 7 8 9 10
detractor => 0 - 6
Passive => 7 - 8
Promoter => 9 - 10

(promoter numbers - detractor numbers) / (quantity of people that answered) x 100
*/

class NpsController {
    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        const detractors = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passives = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveysUsers.length;

        const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));

        return response.json({
            detractors,
            promoters,
            passives,
            totalAnswers,
            nps: calculate,
        });
    }
}

export { NpsController };