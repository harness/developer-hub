import { type, IltCardItem, tileType, cardType } from "../Card";
import { MODULES } from "../../../constants";

export const spt: IltCardItem[] = [
   {
    title: "Harness Platform Fundamentals",
    module: MODULES.platform,
     type: type.user,
     description:
       "Self-paced webinar style course introducing the Harness Platform.",
     version: "Free/Teams Plans of any module",
     link: "https://university-registration.harness.io/self-paced-training-platform-fundamentals",
     tileType: tileType.preReq,
     cardType: cardType.SPT,
   },
];
