export const skillData = {
    "그래스필드": {
        name: "그래스필드",
        type: "풀",
        category: "변화",
        power: 0,
        accuracy: 1,
        priority: 0,
        pp: 10,
        description: "한동안 초목들이 무성하게 자라는 땅으로 만든다.",
        additionalEffect: {
            field: "그래스필드",
            expiresIn: 5,

        }
    },
    "프리즈드라이": {
        name: "프리즈드라이",
        type: "얼음",
        category: "특수",
        power: 70,
        accuracy: 1,
        priority: 0,
        pp: 20,
        description: "상대를 급격히 차갑게 하여 얼음 상태로 만들 때가 있다.\n물타입 포켓몬에게도 효과가 굉장해진다.",
        additionalEffect: {
            status: "얼음",
            accuracy: 0.1,
            curePercent: 0.2,
        }
    },
    "하이드로펌프": {
        name: "하이드로펌프",
        type: "물",
        category: "특수",
        power: 110,
        accuracy: 0.8,
        priority: 0,
        pp: 5,
        description: "대량의 물을 세찬 기세로 상대에게 발사하여 공격한다.",
    },
    "퀵턴": {
        name: "퀵턴",
        type: "물",
        category: "물리",
        power: 60,
        accuracy: 1,
        pp: 20,
        priority: 0,
        description: "공격한 뒤 굉장한 스피드로 돌아와서 교대 포켓몬과 교체한다.",
        additionalEffect: {
            status: "교체",
        }
    },
    "테라버스트": {
        name: "테라버스트",
        type: "노말",
        category: "중립",
        power: 60,
        accuracy: 1,
        pp: 20,
        priority: 0,
        description: "테라스탈한 포켓몬이 사용하면 위력이 더 높은 테라스탈타입과 같은 타입의 기술로 변한다.",
        additionalEffect: {
            status: "테라버스트",
        }
    },
}
