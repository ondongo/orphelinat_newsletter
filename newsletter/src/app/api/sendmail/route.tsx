import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "../../../../emails/EmailTemplate";

import { transporter, baseMailOptions } from "../../../../lib/mailer";
import { render } from "@react-email/render";
import ReceveidTemplate from "../../../../emails/ReceveidTemplate";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, name, phone} = body;
    let plainTextMail: string = "";
    let plainTextMail2: string = "";
    let reactToHtml: string = "";
    let reactToHtml2: string = "";

    if (email) {
      plainTextMail = render(
        <EmailTemplate
          email={email}
          name={name}
          phone={phone}
        />,
        {
          plainText: true,
        }
      );

      plainTextMail2 = render(
        <ReceveidTemplate
          email={email}
          name={name}
          phone={phone}
     
        />,
        {
          plainText: true,
        }
      );

      reactToHtml = render(
        <EmailTemplate
          email={email}
          name={name}
          phone={phone}
       
        />
      );

      reactToHtml2 = render(
        <ReceveidTemplate
          email={email}
          name={name}
          phone={phone}
         
        />
      );

      const [firstEmailResponse, secondEmailResponse] = await Promise.all([
        transporter.sendMail({
          ...baseMailOptions,
          to: "visiteauxorphelins2024@gmail.com",
          subject: "Visites aux orphelins",
          text: plainTextMail,
          html: reactToHtml,
        }),
        transporter.sendMail({
          ...baseMailOptions,
          to: email,
          subject: "Visites aux orphelins",
          text: plainTextMail2,
          html:  reactToHtml2,
        }),
      ]);

      console.log("First Email Response", firstEmailResponse);
      console.log("Second Email Response", secondEmailResponse);

      return Response.json({ firstEmailResponse, secondEmailResponse });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Receiver Email is Invalid",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ error });
  }
};
