
interface Student {
  id: string,
  fullName: string;
  email: string;
  phone: string;
  indexNumber: string;
  level: string;
  programOfStudy: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  session: "regular" | "weekend"
}

export const student: Student = {
  id: "emn",
  fullName: "Emmanuel Somuah",
  indexNumber: "B20224136D",
  isVerified: true,
  email: "emmanuel@gmail.com",
  level: "L300",
  programOfStudy: "Btech Comp Science",
  createdAt: new Date(),
  updatedAt: new Date(),
  session: "regular",
  phone: "+233559286073",
}