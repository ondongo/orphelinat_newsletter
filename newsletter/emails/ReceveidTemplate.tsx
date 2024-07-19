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

export default function ReceveidTemplate({ name, email, phone }: EmailProps) {
  return (
    <Layout username={name}>
      <Text style={h3}>Cher(e) {name},</Text>
      <Section style={{ textAlign: "center", paddingBlock: "22px" }}>
        <Text style={largeText}>
          Merci de partager notre vision , ensemble aidons les orphelins
        </Text>

        <Text style={normalText}>Email: {email}</Text>
        <Text style={normalText}>Téléphone: {phone}</Text>
      </Section>
    </Layout>
  );
}

const h3 = {
  color: "#000",
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "left" as const,
  padding: "0",
  margin: "10px 0",
};

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

const btn = {
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "4px",
  color: "#000",
  backgroundColor: "#CE9D06",
  padding: "10px 20px",
  margin: "20px 0",
  border: "none",
  cursor: "pointer",
};
