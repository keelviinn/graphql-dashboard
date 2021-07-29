import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from "react-icons/ri";
import NavLink from "./NavLink";
import NavSection from "./NavSection";

export default function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/usuarios">Usuários</NavLink>
      </NavSection>

      <NavSection title="Automação">
        <NavLink icon={RiInputMethodLine} href="/formulario">Formulário</NavLink>
        <NavLink icon={RiGitMergeLine} href="/automacao">Automação</NavLink>
      </NavSection>
    </Stack>
  );
}