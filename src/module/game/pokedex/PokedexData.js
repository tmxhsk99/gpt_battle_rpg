import "../Content/PoketmonConst";
import front991 from "../images/battle/poketmon/front/poketmon_front991.png"
import back991 from "../images/battle/poketmon/back/poketmon_back991.png"
import front149 from "../images/battle/poketmon/front/poketmon_front149.png"
import back149 from "../images/battle/poketmon/back/poketmon_back149.png"
export const pokedex = {
    149: {
        name: "망나뇽",
        type: [window.PoketmonType.드래곤, window.PoketmonType.비행],
        sex: ["♂", "♀"],
        ability: ["멀티스케일","정신력"],
        h: 91,
        a: 134,
        b: 95,
        c: 100,
        d: 100,
        s: 80,
        frontSrc: front149,
        backSrc: back149,
        sampleEffort: [180, 204, 4, 0, 4, 116],
        sampleNature: window.PoketmonNatureType.고집,
        sampleItem: "생명의구슬",
        sampleSkill: ["신속", "용의춤", "지진", "불꽃펀치"],
        sampleTera: window.PoketmonType.노말,
    },
    991: {
        name: "무쇠보따리",
        type: [window.PoketmonType.얼음, window.PoketmonType.물],
        ability: ["쿼크차지"],
        sex: [""],
        h: 56,
        a: 80,
        b: 114,
        c: 64,
        d: 60,
        s: 136,
        frontSrc: front991,
        backSrc: back991,
        sampleEffort: [4, 0, 0, 252, 0, 252],
        sampleNature: window.PoketmonNatureType.겁쟁이,
        sampleItem: "기합의띠",
        sampleSkill: ["프리즈드라이", "하이드로펌프", "퀵턴", "테라버스트"],
        sampleTera: window.PoketmonType.격투,
    }
}