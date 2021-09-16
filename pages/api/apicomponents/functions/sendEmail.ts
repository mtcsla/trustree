import mailgun from "mailgun-js";

const mg = mailgun({
  apiKey: "30191d21d59f233e825c3ef7c8e1efe6-aff8aa95-71e35ecd",
  domain: "trustree.pl",
  host: "api.eu.mailgun.net",
  publicApiKey: "pubkey-89507d19571f310fd9ed85d76a1a9baa",
});

interface MaildataProps {
  to: string;
  from?: string;
  subject: string;
  html: string;
}

/** * @param maildata - { to: recipient of the email, from?: email to send from,  subject: subject of the email, html: email body } **/
export default async function sendEmail(maildata: MaildataProps) {
  let error;

  if (!maildata.from) maildata.from = "Trustree <testing@trustree.pl>";

  try {
    await mg.messages().send(maildata);
  } catch (err) {
    error = err;
  }

  return new Promise<void>((resolve, reject) => {
    if (error) reject(error);
    else resolve();
  });
}
