import { sendMail } from "./apicomponents/functions/sendEmail"
const mailPwd = "zaeI3X210NAWb2V3aNCG";

export default async (req, res) => { 

    req.body = JSON.parse(req.body);

    if (req.body.password != mailPwd) {
        res.status(401).send();
    }
    else {
        const { email, message, name } = req.body;
        try {
            await sendMail({
                email, message: `Dzień dobry,\n\n${message}\n\nZ wyrazami szacunku,\n${name}, zespół Trustree \n\n\n\n Nie odpowiadaj na tę wiadomość -- jeśli masz dalsze pytania, skontaktuj się z nami zadając pytanie przez stronę.` });

            res.status(200).json({
                message: "Email sent."
            })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Something went wrong."
            })
        }
    }
}