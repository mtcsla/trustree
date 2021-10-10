import sgMail from "@sendgrid/mail";

const sendgrindApiKey =
  "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";

sgMail.setApiKey(sendgrindApiKey);

interface MaildataProps {
  to: string;
  from?: string;
  subject: string;
  html: string;
}

/** * @param maildata - { to: recipient of the email, from?: email to send from,  subject: subject of the email, html: email body } **/
export default async function sendEmail(maildata: MaildataProps) {
  let error;

  if (!maildata.from) maildata.from = "noreply@trustree.pl";

  try {
    //@ts-ignore
    await sgMail.send(maildata);
  } catch (err) {
    error = err;
  }

  return new Promise<void>((resolve, reject) => {
    if (error) reject(error);
    else resolve();
  });
}
