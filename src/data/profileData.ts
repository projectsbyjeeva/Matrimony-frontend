import bride1 from "../assets/images/bride-1.png";
import bride2 from "../assets/images/bride-2.png";
import bride3 from "../assets/images/bride-3.png";
import groom1 from "../assets/images/groom-1.png";
import groom2 from "../assets/images/groom-2.png";

export type Profile = {
  id: string;
  image: string;
  name: string;
  lookingFor: string;
  age: number;
  religion: string;
  community: string;
  maritalStatus: string;
  education: string;
  occupation: string;
  country: string;
  state: string;
  city: string;
};

export const profiles: Profile[] = [
  { id: "priya", image: bride1, name: "Priya", lookingFor: "Bride", age: 24, religion: "Hindu", community: "Vanniyar", maritalStatus: "Never Married", education: "BE", occupation: "Engineer", country: "India", state: "Tamil Nadu", city: "Chennai" },
  { id: "arun", image: groom1, name: "Arun", lookingFor: "Groom", age: 28, religion: "Hindu", community: "Gounder", maritalStatus: "Never Married", education: "MBA", occupation: "Business", country: "India", state: "Tamil Nadu", city: "Coimbatore" },
  { id: "divya", image: bride2, name: "Divya", lookingFor: "Bride", age: 25, religion: "Christian", community: "Nadar", maritalStatus: "Never Married", education: "Doctor", occupation: "Engineer", country: "India", state: "Tamil Nadu", city: "Madurai" },
  { id: "karthik", image: groom2, name: "Karthik", lookingFor: "Groom", age: 29, religion: "Hindu", community: "Vanniyar", maritalStatus: "Never Married", education: "BE", occupation: "Engineer", country: "India", state: "Tamil Nadu", city: "Salem" },
  { id: "harini", image: bride3, name: "Harini", lookingFor: "Bride", age: 23, religion: "Hindu", community: "Gounder", maritalStatus: "Never Married", education: "BE", occupation: "Teacher", country: "India", state: "Tamil Nadu", city: "Erode" },
  { id: "vignesh", image: groom1, name: "Vignesh", lookingFor: "Groom", age: 30, religion: "Christian", community: "Nadar", maritalStatus: "Divorced", education: "MBA", occupation: "Business", country: "Singapore", state: "Tamil Nadu", city: "Trichy" },
];

// Include the additional home-page profiles as selectable demo accounts.
export const demoProfiles: Profile[] = [
  ...profiles,
  { ...profiles[0], id: "nithya", name: "Nithya", age: 26, city: "Tirunelveli", education: "M.Com", occupation: "Banking Professional" },
  { ...profiles[3], id: "surya", name: "Surya", age: 27, city: "Chennai", occupation: "Product Designer" },
  { ...profiles[4], id: "keerthana", name: "Keerthana", age: 24, city: "Coimbatore", education: "B.Arch", occupation: "Architect" },
  { ...profiles[1], id: "pradeep", name: "Pradeep", age: 31, city: "Madurai", education: "M.Tech", occupation: "Senior Engineer" },
];
