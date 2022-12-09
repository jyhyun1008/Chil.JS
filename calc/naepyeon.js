const moment = require("moment");
var jsonData = require('tzdata');

const timeStampOptions = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' , hour: "2-digit", minute: "2-digit", timeZone:"Asia/Seoul" }

function naepyeon(Year) {
    //0. 상수목록
    const unit = {
        DtoM: 10000, //
        HDtoM: 5000,
        MtoD: 1/10000,
        MtoHD: 1/5000,
        DtoMS: 86400000,
        MStoD: 1/86400000
    }

    const Init = {
        Julian: {Day: 2440587.5}, //1970년 1월 1일 -> Julian Date
        Ju: {Min: 3151075}, //주응 [분]
        Gi: {Min: 550600}, //기응 [분]
        Yun: {Min: 202050}, //윤응 [분]
        Jeon: {Min: 130205}, //전응 [분]
        Gyo: {Min: 260388} //교응 [분]
    }

    const Julian1281 = {
        Ms: function(){ return new Date(1280, 9, 20, -9) },
        Day: function() {return this.Ms() * unit.MStoD + Init.Julian.Day},
        Min: function(){ return this.Day() * unit.DtoM }
    }

    //천행제율

    const Jucheon = {
        Min: function(){ return 3652575 }, //주천분 [분]
        Deg: function(){ return this.Min() * unit.MtoD }, //주천도 [도]
        Hlf: function(){ return {Deg: this.Deg() / 2} }, //반주천 [도]
        Qrt: function(){ return {Deg: this.Deg() / 4} } //주천상한 [도]
    }

    //일행제율

    const Se = {
        Min: function(){ return 3652425 }, //세실
        Day: function(){ return this.Min() * unit.MtoD }, //세주
        Hlf: function(){ return {Day: this.Day() / 2}}, //반세주
        Qrt: function(){ return {Day: this.Day / 4}}, //세상한
        Diff: function(){ return {Deg: 0.015}}, //세차 [도]
        Remain: function(){ return {Min: 52425}} //세여 [분]
    }

    const WolYun = {
        Min: 9062.82 //월윤 [분]
    }
    
    const TongYun = {
        Min: 108753.84 //통윤 [분]
    }

    const GiChaek = {
        Day: 15.2184375 //기책 [일]
    }

    const MolHan = {
        Min: 7815.625 //몰한 [분]
    }

    const GiYeong = {
        Min: 2184.375 //기영 [분]
    }

    const SakHeo = {
        Min: 4694.07 //삭허 [분]
    }

    const GiBeob = { 
        Min: 600000,  //순주
        Day: 60 //기법
    }

    const ToWangChaek = {
        Day: 3.0436875 //토왕책 [일]
    }

    const Hr = {
        Jin: 10000, //진법
        HJin: 5000, //반진법
        Gak: 1200 //각법
    }

    const YDiv = {
        YCCM: {Day: 88.909225}, //영초축말한 [일]
        CCYM: {Day: 93.712025} //축초영말한 [일]
    }

    const HonMyeong = {
        Min: 250 //혼명 [분]
    }

    //월행제율

    const Sak = {
        Min: function(){ return 295305.93 }, //삭실 [분]
        Day: function(){ return this.Min() * unit.MtoD }, //삭책 [일]
        Qrt: function(){ return {
            Day: this.Day() / 4,  //현책 [일]
            Deg: Jucheon.Qrt().Deg //상현도 [도]
        }} ,
        Hlf: function(){ return {
            Day: this.Day() / 2,  //망책 [일]
            Deg: Jucheon.Hlf().Deg //망도 [도]
        }},
        tQrt: function(){ return {
            Deg: 3 * Jucheon.Qrt().Deg //하현도 [도]
        }}
    }

    const WolPHaeng = {
        Deg: 13.36875 //월평행 [도]
    }

    const JeonJong = {
        Min: function(){ return 275546 }, //전종분 [분]
        Day: function(){ return this.Min() * unit.MtoD }, //전종일 [일]
        Hlf: function(){ return {
            Day: this.Day() / 2, //전중일 [일]
        }},
        Diff: function(){ return 1.975993 } //전차 [일]
    }
    
    const Han = {
        Cho: 84, //초한
        Jung: 168, //중한
        Ju: 336, //주한
        HBun: {Min: 820} //태양한행분 [분]
    }

    const GyoJong = {
        Min: 272122.24, //교종분 [분]
        Day: this.Min * unit.MtoD, //교종일 [일]
        Deg: 393.7934, //교종도 [도]
        Hlf: {
            Day: this.Day / 2, //교중일 [일]
            Deg: this.Deg / 2 //교중도 [도]
        },
        Diff: 2.318369, //교차 [일]
        Mang: Sak.Hlf.Day //교망 [일]
    }
    
    const JeongGyo = {
        Deg: 357.64, //정교도 [도]
        Hlf: {
            Deg: 188.05 //중교도 [도]
        }
    }

    const JeonJun = {
        Deg: 166.3968 //전준 [도]
    }

    const HuJun = {
        Deg: 15.50 //후준 [도]
    }

    //기타 상수들, 간지표, 절기표 등등

    const IpSeong = {
        GanJi: ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳',
        '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥',
        '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳',
        '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥',
        '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳',
        '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥',
        '庚子', '辛丑', '壬寅', '癸卯', '甲辰', '乙巳',
        '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥',
        '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳',
        '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'],

        JeolGi: ['冬至', '小寒', '大寒', '立春', '雨水', '驚蟄',
        '春分', '淸明', '穀雨', '立夏', '小滿', '芒種',
        '夏至', '小暑', '大暑', '立秋', '處暑', '白露',
        '秋分', '寒露', '霜降', '立冬', '小雪', '大雪'],

        Sunrise_W: [ //동지 후 n일 일출분 = Sunrise_W[n]
            3043.50, 3043.41, 3043.11, 3042.63, 3041.95,   //000-004
            3041.09, 3040.05, 3038.81, 3037.38, 3035.76,   //005-009
            3033.95, 3031.94, 3029.75, 3027.36, 3024.79,   //010-014
            3022.03, 3019.08, 3015.96, 3012.64, 3009.13,   //015-019
            3005.44, 3001.56, 2997.40, 2993.26, 2988.84,   //020-024

            2984.24, 2979.47, 2974.52, 2969.39, 2964.12,   //025-029
            2958.67, 2953.06, 2947.30, 2941.39, 2935.32,   //030-034
            2929.10, 2922.75, 2916.26, 2909.64, 2902.89,   //035-039
            2896.01, 2889.02, 2881.91, 2874.69, 2867.37,   //040-044
            2859.96, 2852.45, 2844.85, 2837.17, 2829.41,   //045-049

            2821.59, 2813.70, 2805.75, 2797.73, 2789.66,   //050-054
            2781.56, 2773.41, 2765.21, 2756.99, 2748.74,   //055-059
            2740.46, 2732.15, 2723.83, 2715.50, 2707.15,   //060-064
            2698.79, 2690.44, 2682.07, 2673.70, 2665.33,   //065-069
            2656.95, 2648.58, 2640.22, 2631.86, 2623.51,   //070-074

            2615.16, 2606.83, 2598.50, 2590.18, 2581.86,   //075-079
            2573.56, 2565.28, 2557.01, 2548.74, 2540.48,   //080-084
            2532.23, 2523.97, 2515.73, 2507.49, 2499.24,   //085-089
            2491.02, 2482.80, 2474.59, 2466.38, 2458.17,   //090-094
            2449.97, 2441.77, 2433.58, 2425.39, 2417.19,   //095-099
            
            2408.98, 2400.78, 2392.58, 2384.39, 2376.19,   //100-104
            2368.00, 2359.81, 2351.63, 2343.45, 2335.27,   //105-109
            2327.11, 2318.95, 2310.81, 2302.69, 2294.58,   //110-114
            2286.48, 2278.41, 2270.36, 2262.33, 2254.33,   //115-119
            2246.37, 2238.44, 2230.54, 2222.69, 2214.89,   //120-124

            2207.14, 2199.43, 2191.78, 2184.20, 2176.69,   //125-129
            2169.24, 2161.86, 2154.56, 2147.34, 2140.21,   //130-134
            2133.17, 2126.23, 2119.28, 2112.64, 2106.00,   //135-139
            2099.48, 2093.07, 2086.79, 2080.62, 2074.58,   //140-144
            2068.67, 2062.89, 2057.24, 2051.74, 2046.38,   //145-149

            2041.15, 2036.07, 2031.15, 2026.36, 2021.73,   //150-154
            2017.25, 2012.93, 2008.76, 2004.75, 2000.90,   //155-159
            1997.20, 1993.66, 1990.29, 1987.07, 1984.02,   //160-164
            1981.14, 1978.40, 1975.83, 1973.42, 1971.17,   //165-169
            1969.08, 1967.16, 1965.40, 1963.80, 1962.36,   //170-174

            1961.08, 1959.97, 1959.01, 1958.20, 1957.55,   //175-179
            1957.06, 1956.73, 1956.55                      //180-182
        ],

        Sunrise_S: [ //하지 후 n일 일출분 = Sunrise_S[n]
             
            1956.50, 1956.58, 1956.82, 1957.22, 1957.77,   //000-004
            1958.48, 1959.35, 1960.37, 1961.55, 1962.90,   //005-009
            1964.40, 1966.06, 1967.89, 1969.87, 1972.02,   //010-014
            1974.33, 1976.79, 1979.42, 1982.22, 1985.15,   //015-019
            1988.26, 1991.53, 1994.96, 1998.56, 2002.32,   //020-024

            2006.23, 2010.30, 2014.53, 2018.92, 2023.46,   //025-029
            2028.16, 2032.99, 2037.97, 2043.11, 2048.40,   //030-034
            2053.81, 2059.37, 2065.07, 2070.90, 2076.87,   //035-039
            2082.95, 2089.16, 2095.49, 2101.95, 2108.51,   //040-044
            2115.19, 2121.97, 2128.85, 2135.83, 2142.90,   //045-049

            2150.06, 2157.31, 2164.64, 2172.05, 2179.52,   //050-054
            2187.06, 2194.66, 2202.34, 2210.06, 2217.83,   //055-059
            2225.65, 2233.53, 2241.44, 2249.38, 2257.35,   //060-064
            2265.37, 2273.41, 2281.46, 2289.55, 2297.65,   //065-069
            2305.76, 2313.89, 2322.04, 2330.20, 2338.37,   //070-074

            2346.54, 2354.72, 2362.91, 2371.10, 2379.30,   //075-079
            2387.49, 2395.68, 2403.88, 2412.09, 2420.30,   //080-084
            2428.49, 2436.68, 2444.88, 2453.07, 2461.28,   //085-089
            2469.49, 2477.70, 2485.92, 2494.13, 2502.39,   //090-094
            2510.61, 2518.85, 2527.10, 2535.35, 2543.61,   //095-099

            2551.87, 2560.14, 2568.41, 2576.69, 2585.01,   //100-104
            2593.33, 2601.65, 2609.98, 2618.32, 2626.67,   //105-109
            2635.03, 2643.39, 2651.75, 2660.12, 2668.50,   //110-114
            2676.87, 2685.24, 2693.60, 2701.96, 2710.32,   //115-119
            2718.66, 2726.99, 2735.30, 2743.60, 2751.86,   //120-124

            2760.10, 2768.32, 2776.50, 2784.63, 2792.72,   //125-019
            2800.77, 2808.71, 2816.69, 2824.55, 2832.35,   //130-034
            2840.08, 2847.73, 2855.30, 2862.78, 2870.15,   //135-139
            2877.44, 2884.61, 2891.68, 2898.63, 2905.47,   //140-044
            2912.17, 2918.74, 2925.18, 2931.49, 2937.65,   //145-049

            2943.67, 2949.51, 2955.22, 2960.77, 2966.15,   //150-154
            2971.35, 2976.41, 2981.29, 2986.00, 2990.52,   //155-159
            2994.87, 2999.04, 3003.04, 3006.85, 3010.47,   //160-164
            3013.91, 3017.15, 3020.22, 3023.10, 3025.79,   //165-169
            3028.29, 3030.61, 3032.73, 3034.67, 3036.41,   //170-174

            3037.96, 3039.32, 3040.47, 3041.44, 3042.23,   //175-179
            3042.83, 3043.23, 3043.45                      //180-182

        ]
    }

    //계산에 필요한 함수들 정의

    function mod(n, m) {
        while (n < 0){
            n = n + m;
        }
        return ((n % m) + m) % m;
    }

    function GanJiOf(JulianDate){
       return IpSeong.GanJi[parseInt(mod(JulianDate - Julian1281.Day(), GiBeob.Day))]
    }

    function FromMidnightTo(JulianDate){
        return Math.round(mod((JulianDate - Julian1281.Day())*unit.DtoM, unit.DtoM))
    }

    function MillisecOf(JulianDate){
        return Math.round(( JulianDate - Init.Julian.Day ) * unit.DtoMS)
    }

    function TZConverter(ms){
        return new Date(ms).toLocaleString("ja-JP", timeStampOptions)
    }

    // 1. 천정동지

        var JungJeok = { Min: (Year - 1281) * Se.Min() }
        var TongJeok = { Min: JungJeok.Min + Init.Gi.Min }
        var cjdj = {
            Min: function(){ return TongJeok.Min + Julian1281.Min() }, // Julian Min
            Day: function(){ return this.Min() * unit.MtoD }, //Julian Day
            GanJi: function(){ return GanJiOf(this.Day())},
            mmmm: function(){ return FromMidnightTo(this.Day())},
            Ms: function(){ return MillisecOf(this.Day())},
            Timezone: function(){ return TZConverter(this.Ms()) }
        }

        var PyeongGi = {
            JeolGi: [],
            Day: [],
            GanJi: [],
            mmmm: [],
            Ms: [],
            Timezone: []
        }

        for (var i = 0; i < 25; i++){
            PyeongGi.JeolGi.push(IpSeong.JeolGi[mod(i, 24)])
            PyeongGi.Day.push(cjdj.Day() + i * GiChaek.Day) //Julian Day
            PyeongGi.GanJi.push( GanJiOf(PyeongGi.Day[i]) )
            PyeongGi.mmmm.push( FromMidnightTo(PyeongGi.Day[i]) )
            PyeongGi.Ms.push( MillisecOf(PyeongGi.Day[i]) )
            PyeongGi.Timezone.push( TZConverter(PyeongGi.Ms[i]) )
        }

    // 2. 천정경삭

    var YunJeok = { Min: JungJeok.Min + Init.Yun.Min }
    var YunYeo = { Min: mod(YunJeok.Min, Sak.Min()) }
    var cjgs = {
        Min: function(){ return (cjdj.Min() - YunYeo.Min)},
        Day: function(){ return this.Min() * unit.MtoD },
        GanJi: function(){ return GanJiOf(this.Day())},
        mmmm: function(){ return FromMidnightTo(this.Day())},
        Ms: function(){ return MillisecOf(this.Day())},
        Timezone: function(){ return TZConverter(this.Ms()) }
    }

    var GyeongSak = {
        Month: [], 
        Phase: [{}, {}, {}, {}]
    }

    for (var j = 0; j < 4; j++){
        GyeongSak.Phase[j] = {
            Day: [],
            GanJi: [],
            mmmm: [],
            Ms: [],
            Timezone: []
        }
        for (var i = 0; i < 16; i++){
            if (j == 0){
                GyeongSak.Month.push(mod((i - 2), 12) + 1)
            }
            GyeongSak.Phase[j].Day.push(cjgs.Day() + j * Sak.Qrt().Day + i * Sak.Day()) //Julian Day
            GyeongSak.Phase[j].GanJi.push( GanJiOf(GyeongSak.Phase[j].Day[i]) )
            GyeongSak.Phase[j].mmmm.push( FromMidnightTo(GyeongSak.Phase[j].Day[i]) )
            GyeongSak.Phase[j].Ms.push( MillisecOf(GyeongSak.Phase[j].Day[i]) )
            GyeongSak.Phase[j].Timezone.push( TZConverter(GyeongSak.Phase[j].Ms[i]) )
        }
    }

    // 3. 몰일추산

    var Mol = {
        Day: [],
        DayCount: [],
        GanJi: [],
        Ms: [],
        Timezone: []
    }

    for (var i = 0; i < PyeongGi.JeolGi.length; i++){
        if(PyeongGi.mmmm[i] <= MolHan.Min){
            Mol.Day.push(undefined)
            Mol.DayCount.push(undefined)
            Mol.GanJi.push(undefined)
            Mol.Ms.push(undefined)
            Mol.Timezone.push(undefined)
        } else {
            Mol.DayCount.push(parseInt((GiChaek.Day * unit.DtoM - PyeongGi.mmmm[i] * 15) / GiYeong.Min))
            Mol.Day.push(parseInt(PyeongGi.Day[i])+Mol.DayCount[i])
            Mol.GanJi.push(GanJiOf(Mol.Day[i]))
            Mol.Ms.push(MillisecOf(Mol.Day[i]))
            Mol.Timezone.push(TZConverter(Mol.Ms[i]))
        }
    }


    var Myeol = {
        Day: [],
        DayCount: [],
        GanJi: [],
        Ms: [],
        Timezone: []
    }

    for (var i = 0; i < GyeongSak.Month.length; i++){
        if (GyeongSak.Phase[0].mmmm[i] >= SakHeo.Min){
            Myeol.Day.push(undefined)
            Myeol.DayCount.push(undefined)
            Myeol.GanJi.push(undefined)
            Myeol.Ms.push(undefined)
            Myeol.Timezone.push(undefined)
        } else {
            Myeol.DayCount.push(parseInt((GyeongSak.Phase[0].mmmm[i] * 30)/SakHeo.Min))
            Myeol.Day.push(parseInt(GyeongSak.Phase[0].Day[i])+Myeol.DayCount[i])
            Myeol.GanJi.push(GanJiOf(Myeol.Day[i]))
            Myeol.Ms.push(MillisecOf(Myeol.Day[i]))
            Myeol.Timezone.push(TZConverter(Myeol.Ms[i]))
        }
    }

    var result = {
        PyeongGi: PyeongGi,
        GyeongSak: GyeongSak,
        Mol: Mol,
        Myeol: Myeol
    }


    return result
}
  
module.exports.naepyeon = naepyeon;
