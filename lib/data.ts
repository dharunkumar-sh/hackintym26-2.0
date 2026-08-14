export interface HeroTeam {
  name: string
  track: string
  photo?: string
  role?: string
  leader?: string
}

export const HERO_TEAMS: HeroTeam[] = [
  { name: "Datadazzlers", track: "Artificial Intelligence", photo: "", leader: "Commander Alpha" },
  { name: "The Grix", track: "Cybersecurity", photo: "", leader: "Shadow Prime" },
  { name: "Team Hopeless", track: "Open Innovation", photo: "", leader: "Apex Nova" },
  { name: "Hyper Nova", track: "Healthcare Tech", photo: "", leader: "Quantum Spark" },
  { name: "Connect", track: "Social Impact", photo: "", leader: "Nexus Link" },
  { name: "Sparkles", track: "Artificial Intelligence", photo: "", leader: "Vortex Ray" },
  { name: "Elite", track: "Cybersecurity", photo: "", leader: "Aegis Core" },
  { name: "Nova Four", track: "Open Innovation", photo: "", leader: "Cosmic Sentinel" },
  { name: "SheEnergy", track: "Social Impact", photo: "", leader: "Valkyrie Lead" },
  { name: "INNOVISION", track: "Healthcare Tech", photo: "", leader: "Cyber Visionary" },
  { name: "PlaySync", track: "Open Innovation", photo: "", leader: "Synapse Zero" },
  { name: "MS VISIONARY", track: "Artificial Intelligence", photo: "", leader: "Neural Titan" },
  { name: "Cybersquard", track: "Cybersecurity", photo: "", leader: "Firewall Guard" },
  { name: "Veldora", track: "Social Impact", photo: "", leader: "Storm Bringer" },
  { name: "GridGuardians", track: "Cybersecurity", photo: "", leader: "Shield Defender" },
  { name: "Low batery legends", track: "Open Innovation", photo: "", leader: "Overclock Spec" },
  { name: "Tech Talkies", track: "Social Impact", photo: "", leader: "Echo Transmitter" },
  { name: "Petrova", track: "Healthcare Tech", photo: "", leader: "Bio Genesis" },
  { name: "Codewaves", track: "Artificial Intelligence", photo: "", leader: "Byte Surge" },
  { name: "Astra", track: "Cybersecurity", photo: "", leader: "Astral Vanguard" },
  { name: "Scammers", track: "Open Innovation", photo: "", leader: "Glitch Master" },
  { name: "Ctrl Alt Elite", track: "Artificial Intelligence", photo: "", leader: "Command Exec" },
  { name: "Quantum Coders", track: "Healthcare Tech", photo: "", leader: "Subatomic Dev" },
  { name: "ZENITH", track: "Cybersecurity", photo: "", leader: "Apex Guardian" },
  { name: "SIGMA FUSION", track: "Social Impact", photo: "", leader: "Fusion Prime" }
]

export const STANDBY_HEROES: HeroTeam[] = [
  { name: "SheNnovators", track: "Social Impact", photo: "", leader: "Nova Spark" },
  { name: "GridX Innovators", track: "Open Innovation", photo: "", leader: "Grid Spec" },
  { name: "SparkX", track: "Artificial Intelligence", photo: "", leader: "Ignite Lead" },
  { name: "Avenix", track: "Cybersecurity", photo: "", leader: "Avenger Zero" },
  { name: "Ctrl Freaks", track: "Healthcare Tech", photo: "", leader: "Override Lead" }
]

export const VERIFIED_TEAMS = HERO_TEAMS.map((t) => t.name)
export const STANDBY_TEAMS = STANDBY_HEROES.map((t) => t.name)

export const CHAMPIONS = [
  { name: "INNOVISION", prize: "Grand Prize", amount: "₹7,500", track: "EEE" },
  { name: "QUANTUM CODERS", prize: "First Runner Up", amount: "₹5,000", track: "CSE" },
  { name: "THE GRIX", prize: "Second Runner Up", amount: "₹2,500", track: "AI & DS" },
]

export interface ClubMember {
  name: string
  role: "President" | "Vice President" | "Secretary" | "Treasurer"
  photo?: string
  linkedin?: string
}

export interface DevelopmentClub {
  name: string
  tagline: string
  logo?: string
  badgeColor: string
  borderGlow: string
  members: ClubMember[]
}

export const DEVELOPMENT_CLUBS: DevelopmentClub[] = [
  {
    name: "Dev Dynasty Club",
    tagline: "FULL-STACK & SYSTEM INNOVATORS",
    logo: "/logos/club1.png",
    badgeColor: "text-intel-blue-light bg-intel-blue/20 border-intel-blue/40",
    borderGlow:
      "hover:border-intel-blue hover:shadow-[0_0_30px_rgba(0,102,255,0.3)]",
    members: [
      {
        name: "Ajay Singh I",
        role: "President",
        photo: "/photos/ajay.jpeg",
        linkedin: "https://www.linkedin.com/in/ajay-singh-9969a82a1",
      },
      {
        name: "Aswin VK",
        role: "Vice President",
        photo: "/photos/aswin.png",
        linkedin: "https://www.linkedin.com/in/vk-aswin-0922462a2",
      },
      {
        name: "Shreya Sonpavane VK",
        role: "Secretary",
        photo: "/photos/shreya.png",
        linkedin: "https://www.linkedin.com/in/shreya-sonpavane-2b2b152a1",
      },
      {
        name: "Dharun Kumar SH",
        role: "Treasurer",
        photo: "/photos/dharun.webp",
        linkedin: "https://www.linkedin.com/in/dharunkumar-sh",
      },
    ],
  },
  {
    name: "Adyant Coding Club",
    tagline: "ALGORITHMIC & ARCHITECTURE LEADERS",
    logo: "/logos/club3.png",
    badgeColor: "text-power-red-light bg-power-red/20 border-power-red/40",
    borderGlow:
      "hover:border-power-red hover:shadow-[0_0_30px_rgba(225,6,0,0.3)]",
    members: [
      {
        name: "Ilakiya Emily Joseph Ignatius",
        role: "President",
        photo: "/photos/emily.jpeg",
        linkedin:
          "https://www.linkedin.com/in/ilakiya-emily-joseph-ignatius-46ab21291",
      },
      {
        name: "Lakshwin Krishna Reddy",
        role: "Vice President",
        photo: "/photos/lakshwin.png",
        linkedin: "https://www.linkedin.com/in/lakshwinkrishna",
      },
      {
        name: "Nishanth N",
        role: "Secretary",
        photo: "/photos/nish.jpeg",
        linkedin: "https://www.linkedin.com/in/nishanth-n-35946a276",
      },
      {
        name: "Dhiviyashree S",
        role: "Treasurer",
        photo: "/photos/dhivya.jpeg",
        linkedin:
          "https://www.linkedin.com/in/dhiviyashree-saravanan-117b202a1",
      },
    ],
  },
  {
    name: "AI Epoch Club",
    tagline: "NEURAL & INTELLIGENCE ARCHITECTS",
    logo: "/logos/club2.png",
    badgeColor: "text-green-400 bg-green-500/20 border-green-500/40",
    borderGlow:
      "hover:border-green-400 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)]",
    members: [
      {
        name: "Saidharan Y",
        role: "President",
        photo: "/photos/Sai.jpeg",
        linkedin: "https://www.linkedin.com/in/saidharany",
      },
      {
        name: "Dakshineshwar A",
        role: "Vice President",
        photo: "/photos/dakshin.jpeg",
        linkedin: "https://www.linkedin.com/in/dakshin-a-616b112a1",
      },
      {
        name: "Varshikha P",
        role: "Secretary",
        photo: "/photos/varshika.png",
        linkedin: "https://www.linkedin.com/in/varshikha-ponnambalam-b256662a2",
      },
      {
        name: "Nithya Sri S",
        role: "Treasurer",
        photo: "/photos/nithiya.jpeg",
        linkedin: "https://www.linkedin.com/in/nithyasri11",
      },
    ],
  },
];

export const ORGANIZERS = DEVELOPMENT_CLUBS

export const TIMELINE = [
  { date: "March 14, 2026", event: "Registration Opens" },
  { date: "April 1, 2026", event: "Idea Submission Deadline" },
  { date: "April 9, 2026", event: "Team Shortlisting" },
  { date: "April 18, 2026", time: "10:00 AM", event: "Hackathon Starts" },
  { date: "April 18, 2026", time: "6:00 PM", event: "First Review" },
  { date: "April 19, 2026", time: "12:00 AM", event: "Second Review" },
  { date: "April 19, 2026", time: "4:00 AM", event: "Final Review" },
  { date: "April 19, 2026", time: "8:00 AM", event: "Team Filtering" },
  { date: "April 19, 2026", time: "10:00 AM", event: "Winners Announced" }
]

export const FAQS = [
  { 
    question: "Who can participate?", 
    answer: "HACKINTYM '26 is open to all students passionate about innovation, coding, and problem-solving. We welcome cross-disciplinary teams." 
  },
  { 
    question: "What is the team size?", 
    answer: "Teams must consist of 3 to 4 members. We encourage diverse skill sets including design, development, and domain expertise." 
  },
  { 
    question: "Is it online or offline?", 
    answer: "This is a strictly offline 30-hour hackathon. All teams must be present at the venue for the duration of the mission." 
  },
  { 
    question: "Is there any registration fee?", 
    answer: "Details regarding the registration fee will be provided upon team shortlisting and selection." 
  },
  { 
    question: "What should we bring?", 
    answer: "Bring your laptops, chargers, any necessary hardware components, valid student IDs, and infinite curiosity." 
  },
  { 
    question: "Do I need to have a project idea right now?", 
    answer: "Yes, teams are required to submit their core project idea during the registration phase before the submission deadline." 
  }
]
