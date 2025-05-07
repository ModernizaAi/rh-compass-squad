
// Dados para a página de treinamentos

// Dados dos cursos
export const courses = [
  {
    id: 1,
    title: "Liderança Efetiva",
    description: "Aprenda técnicas de liderança para gerenciar equipes de alto desempenho.",
    category: "Liderança",
    duration: "8 horas",
    enrolledCount: 24,
    completionRate: 75,
    startDate: "15/05/2025",
    status: "Em andamento"
  },
  {
    id: 2,
    title: "Fundamentos de UX/UI Design",
    description: "Princípios fundamentais de design de experiência do usuário e interface.",
    category: "Design",
    duration: "12 horas",
    enrolledCount: 18,
    completionRate: 62,
    startDate: "22/05/2025",
    status: "Aberto para inscrições"
  },
  {
    id: 3,
    title: "Desenvolvimento Full Stack",
    description: "Aprenda a desenvolver aplicações web completas com React e Node.js.",
    category: "Tecnologia",
    duration: "24 horas",
    enrolledCount: 32,
    completionRate: 48,
    startDate: "10/05/2025",
    status: "Em andamento"
  },
  {
    id: 4,
    title: "Gestão de Projetos Ágeis",
    description: "Metodologias ágeis para gerenciamento de projetos de software.",
    category: "Gestão",
    duration: "16 horas",
    enrolledCount: 42,
    completionRate: 85,
    startDate: "05/05/2025",
    status: "Em andamento"
  }
];

// Dados dos funcionários em treinamento
export const employeeTraining = [
  {
    id: 1,
    employeeName: "Carlos Silva",
    position: "Desenvolvedor Full Stack",
    department: "Tecnologia",
    coursesCompleted: 4,
    coursesInProgress: 1,
    lastActivity: "3 dias atrás",
    certifications: ["AWS Certified Developer", "React Certified"]
  },
  {
    id: 2,
    employeeName: "Ana Ferreira",
    position: "Designer UX/UI",
    department: "Produto",
    coursesCompleted: 3,
    coursesInProgress: 2,
    lastActivity: "1 dia atrás",
    certifications: ["UI/UX Certified Designer"]
  },
  {
    id: 3,
    employeeName: "Roberto Santos",
    position: "Gerente de Marketing",
    department: "Marketing",
    coursesCompleted: 2,
    coursesInProgress: 0,
    lastActivity: "1 semana atrás",
    certifications: ["Marketing Digital Certified"]
  },
  {
    id: 4,
    employeeName: "Juliana Costa",
    position: "Analista de RH",
    department: "Recursos Humanos",
    coursesCompleted: 5,
    coursesInProgress: 1,
    lastActivity: "2 dias atrás",
    certifications: ["HR Management Certified", "Talent Acquisition Certified"]
  }
];
