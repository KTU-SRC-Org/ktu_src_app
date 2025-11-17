import { ImageSourcePropType } from 'react-native';
import { SrcNewsInterface } from '@/types/src-news.types';

export const srcNewsData: SrcNewsInterface[] = [
  {
    id: '1',
    body: `
# SRC Launches Digital ID System

The **Student Representative Council (SRC)** has officially launched a new **Digital ID platform** designed to simplify student verification on campus.

### Background
Over the years, students have faced challenges in verifying their identity during exams, events, and campus services. The new system — powered by a QR-based ID — aims to solve these issues permanently.

### Key Benefits
- Instant verification at campus gates and exams  
- Integrated access for library and SRC events  
- Enhanced data security using **end-to-end encryption**

### Student Reactions
Many students expressed excitement about the new initiative. *"It’s about time technology simplified our student life,"* said **Ama Owusu**, a Level 300 student from the Computer Science Department.

> “We are building a smarter KTU — one innovation at a time,” said the SRC President.

Check more details on the [KTU SRC Portal](https://ktu.edu.gh/src).
`,
    publisher: 'SRC President',
    publisherImage: require('@/assets/images/Campus-1.png') as ImageSourcePropType,
    source: 'SRC Office',
    category: ['business'],
    publishedAt: new Date('2025-09-12T10:30:00Z'),
    isDraft: false,
    createAt: '2025-09-10T14:45:00Z',
  },
  {
    id: '2',
    body: `
# KTU Introduces Green Campus Initiative

**Environmental sustainability** has become a top priority at Koforidua Technical University (KTU) as the administration and SRC collaborate on a new **Green Campus Project**.

### Project Goals
- Reduce plastic waste across campus.  
- Introduce recycling bins in every block.  
- Encourage paperless administration systems.  

### Partnerships
The SRC partnered with **Eco Ghana Foundation** to provide recycling equipment and host environmental awareness workshops for students.

> “This is not just a campaign; it’s a mindset shift,” said the Environmental Science Department head.

Students are encouraged to join the #GoGreenKTU movement and contribute ideas via the [official forum](https://ktu.edu.gh/gogreen).
`,
    publisher: 'SRC Pro',
    publisherImage: require('@/assets/images/Campus-1.png') as ImageSourcePropType,
    source: 'Tech Department',
    category: ['tech', 'business'],
    publishedAt: new Date('2025-10-01T09:00:00Z'),
    isDraft: false,
    createAt: '2025-09-28T16:15:00Z',
  },
  {
    id: '3',
    body: `
# KTU Research Team Develops AI-Powered Exam Monitoring System

A research group from the **Department of Computer Science** has unveiled a new **AI-driven monitoring system** aimed at reducing exam malpractice.

### How It Works
The system uses **computer vision and facial recognition** to track students during exams and automatically flag suspicious behavior.

### Team Behind the Project
The project was led by **Samuel Cobinnah**, with contributions from **Joseph Owusu Ansah** and **Frank Osei** — all final-year software engineering students.

> “Our goal was to prove that local innovation can solve real institutional problems,” said Cobinnah.

### Future Plans
The SRC is currently in talks with university management to pilot the technology in the upcoming mid-semester exams.
`,
    publisher: 'Wocom Office',
    publisherImage: require('@/assets/images/Campus-1.png') as ImageSourcePropType,
    source: 'UX Team',
    publishedAt: new Date('2025-08-15T12:00:00Z'),
    isDraft: false,
    category: ['tech'],
    createAt: '2025-08-12T08:30:00Z',
  },
  {
    id: '4',
    body: `
# SRC Week 2025: A Celebration of Innovation

The long-awaited **SRC Week Celebration** returns this year under the theme: *"Empowering Students Through Innovation and Technology."*

### Activities Lineup
- 🏀 Inter-departmental sports tournament  
- 🎤 Open mic night featuring campus talents  
- 💡 Innovation fair showcasing student startups  
- 🎓 Leadership and entrepreneurship seminar  

### Quote from SRC President
> “We want this year’s celebration to reflect the creative power of KTU students,” — said **President Emmanuel Opare**.

### Highlight
For the first time, SRC Week will include a **Tech Startup Pitch**, where student entrepreneurs can win funding up to **₵10,000**.

Stay updated on schedules at [srcweek.ktu.edu.gh](https://srcweek.ktu.edu.gh).
`,
    publisher: 'SRC Admin',
    publisherImage: require('@/assets/images/Campus-1.png') as ImageSourcePropType,
    source: 'Development Office',
    publishedAt: new Date('2025-11-01T18:20:00Z'),
    isDraft: true,
    category: ['business', 'tech'],
    createAt: '2025-10-29T10:10:00Z',
  },
];
