export const Actions = {
    테라버스트: {
        name: "테라버스트",
        success: [
            {type: "textMessage", text: "{CASTER}은(는) {ACTION}를 사용했다!"},
            {type:"animation", animation: "teraBurst"},
            {type: "stateChange", damage: 80}
        ]
    },
    하이드로펌프: {
        name: "하이드로펌프",
        success: [
            {type: "textMessage", text: "{CASTER}은(는) {ACTION}를 사용했다!"},
        ]
    },
}
