/* eslint-disable @next/next/no-img-element */
import { Section } from "@react-email/section";
import { Button } from "@react-email/button";
import { Text } from "@react-email/text";
import Layout from "./Layout";

type EmailProps = {
  name: string;
  email: string;
  phone: string;

};

export default function EmailTemplate({
  name,
  email,
  phone,
}: EmailProps) {
  return (
    <Layout username={name}>
      <Section style={{ textAlign: "center", paddingBlock: "22px" }}>
        <Text style={largeText}>
         {name} s'est abonné à la newsletter :
        </Text>

        <Text style={normalText}>Email: {email}</Text>
        <Text style={normalText}>Téléphone: {phone}</Text>
      

      </Section>
    </Layout>
  );
}


const largeText = {
  color: "#000",
  fontSize: "16px",
  fontWeight: "normal",
  textAlign: "left" as const,
  padding: "0",
  margin: "10px 0",
};

const normalText = {
  color: "#000",
  fontSize: "14px",
  fontWeight: "normal",
  textAlign: "left" as const,
  padding: "0",
  margin: "10px 0",
};

