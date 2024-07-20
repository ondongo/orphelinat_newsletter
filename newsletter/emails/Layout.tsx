import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

type LayoutProps = {
  username: string;
  emailTitle?: string;
  children: React.ReactNode;
};

export default function Layout({
  username,
  children,
  emailTitle,
}: LayoutProps) {
  return (
    <Html>
      <Head />
      <Preview> Bonjour {username}, merci pour ton intérêt à notre association </Preview>
      <Section style={{ margin: "0 auto" }}>
        <Container style={{ textAlign: "center" }}>
          <Text style={h1}>Visites aux orphelins</Text>
        </Container>
        <Container style={container}>
          <Text style={h1}>Bonjour {username}</Text>
          <Text style={h2}>{emailTitle}</Text>
          {children}
        </Container>
      </Section>
    </Html>
  );
}

const container = {
  margin: "16px auto 40px auto",
  padding: "32px",
  backgroundColor: "#FF7810",
  borderRadius: "10px",
};

const h1 = {
  color: "black",
  fontSize: "24px",
  fontWeight: "normal",
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0",
};

const h2 = {
  color: "black",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  padding: "0",
};
