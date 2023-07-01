import {pokedex} from "./PokedexData";
import {nautureType} from "../Content/PoketmonConst";

export class Poketmon {

    constructor(pokedexNumber, level, individualValue, effort, nature,sex) {
        const defaultLevel = 50;
        this._findPoketmon = pokedex[pokedexNumber];
        this._name = this._findPoketmon.name;
        this._frontSrc = this._findPoketmon.frontSrc;
        this._backSrc = this._findPoketmon.backSrc;
        this._level = level ? level : defaultLevel;
        this._individualValue = individualValue ? individualValue : [31, 31, 31, 31, 31, 31];
        this._effort = effort ? effort : this._findPoketmon.sampleEffort;
        this._nature = nature ? nature : this._findPoketmon.sampleNature;
        this._currentHp = this.calcHpValue();
        this._h = this.calcHpValue();
        this._a = this.getRealAttack();
        this._b = this.getRealDefense();
        this._c = this.getRealSpAttack();
        this._d = this.getRealSpDefense();
        this._s = this.getRealSpeed();
        this._xp = 0;
        this._status = window.PoketmonStatus.정상;
        this._sex = sex ? sex :this._findPoketmon.sex[0];
    }

    get sex() {
        return this._sex;
    }

    set sex(value) {
        this._sex = value;
    }

    get frontSrc() {
        return this._frontSrc;
    }

    get backSrc() {
        return this._backSrc;
    }

    get xp() {
        return this._xp;
    }

    set xp(value) {
        this._xp = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get a() {
        return this._a;
    }

    set a(value) {
        this._a = value;
    }

    get b() {
        return this._b;
    }

    set b(value) {
        this._b = value;
    }

    get c() {
        return this._c;
    }

    set c(value) {
        this._c = value;
    }

    get d() {
        return this._d;
    }

    set d(value) {
        this._d = value;
    }

    get s() {
        return this._s;
    }

    set s(value) {
        this._s = value;
    }

    set individualValue(value) {
        this._individualValue = value;
    }

    set effort(value) {
        this._effort = value;
    }

    set nature(value) {
        this._nature = value;
    }


    takeDamage(damage) {
        this.currentHp -= damage;
        if (this.currentHp < 0) {
            this.currentHp = 0;
        }
        return this.currentHp;
    }

    set currentHp(value) {
        if (value < 0) {
            this._currentHp = 0;
        } else {
            this._currentHp = value;
        }
    }

    get currentHp() {
        return this._currentHp;
    }

    get h() {
        //[{(종족값 * 2) + 개체값 + (노력치/4)} * 1/2 ] + 10 + 50(레벨)
        return this._h;
    }

    get level() {
        return this.level;
    }

    set level(value) {
        this._level = value;
    }

    get level() {
        return this._level;
    }

    getRealAttack() {
        let natureValue = this.calcNatureEffect(this._nature, "a");
        return Math.ceil(this.calcOtherValue(this._findPoketmon.a, this._individualValue[1], this._effort[1], natureValue));
    }

    getRealDefense() {
        let natureValue = this.calcNatureEffect(this._nature, "b");
        return Math.ceil(this.calcOtherValue(this._findPoketmon.b, this._individualValue[2], this._effort[2], natureValue));
    }

    getRealSpAttack() {
        let natureValue = this.calcNatureEffect(this._nature, "c");
        return Math.ceil(this.calcOtherValue(this._findPoketmon.c, this._individualValue[3], this._effort[3], natureValue));
    }

    getRealSpDefense() {
        let natureValue = this.calcNatureEffect(this._nature, "d");
        return Math.ceil(this.calcOtherValue(this._findPoketmon.d, this._individualValue[4], this._effort[4], natureValue));
    }

    getRealSpeed() {
        let natureValue = this.calcNatureEffect(this._nature, "s");
        return Math.ceil(this.calcOtherValue(this._findPoketmon.s, this._individualValue[5], this._effort[5], natureValue));
    }

    calcOtherValue(val, individualValue, effort, nature) {
        //[{(종족값 * 2) + 개체값 + (노력치/4)} * 1/2 + 5 ] * 성격보정(1.1 or 1 or 0.9)
        return ((val * 2) + individualValue + (effort / 4) * 1 / 2 + 5) * nature;
    }

    calcHpValue() {
        return Math.ceil((this._findPoketmon.h * 2) + this._individualValue[0] + (this._effort[0] / 4) * 1 / 2) + 10 + this._level;
        ;
    }

    calcNatureEffect(nature, status) {
        let returnValue = 1;
        switch (nature) {
            case window.PoketmonNatureType.건방:
                status === "a" ? returnValue = 0.9 :
                    status === "b" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.조심:
                status === "a" ? returnValue = 0.9 :
                    status === "c" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.차분:
                status === "a" ? returnValue = 0.9 :
                    status === "d" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.겁쟁이:
                status === "a" ? returnValue = 0.9 :
                    status === "s" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.외로움:
                status === "b" ? returnValue = 0.9 :
                    status === "a" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.의젓:
                status === "b" ? returnValue = 0.9 :
                    status === "c" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.얌전:
                status === "b" ? returnValue = 0.9 :
                    status === "d" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.성급:
                status === "b" ? returnValue = 0.9 :
                    status === "s" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.고집:
                status === "c" ? returnValue = 0.9 :
                    status === "a" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.장난꾸러기:
                status === "c" ? returnValue = 0.9 :
                    status === "b" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.신중:
                status === "c" ? returnValue = 0.9 :
                    status === "d" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.명랑:
                status === "c" ? returnValue = 0.9 :
                    status === "s" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.개구쟁이:
                status === "d" ? returnValue = 0.9 :
                    status === "a" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.촐랑:
                status === "d" ? returnValue = 0.9 :
                    status === "b" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.덜렁:
                status === "d" ? returnValue = 0.9 :
                    status === "c" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.천진난만:
                status === "d" ? returnValue = 0.9 :
                    status === "s" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.용감:
                status === "s" ? returnValue = 0.9 :
                    status === "a" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.무사태평:
                status === "s" ? returnValue = 0.9 :
                    status === "b" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.냉정:
                status === "s" ? returnValue = 0.9 :
                    status === "c" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            case window.PoketmonNatureType.건방:
                status === "s" ? returnValue = 0.9 :
                    status === "d" ? returnValue = 1.1 : returnValue = 1;
                return returnValue;
            default :
                return 1;
        }

    }

}