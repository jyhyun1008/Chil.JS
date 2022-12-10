# 1. Chil.JS

![칠정산내외편](https://github.com/jyhyun1008/chil.js/blob/main/public/assets/chiljs.png?raw=true)

Cjil.JS는 조선시대 1444년에 만들어진 역법인 '칠정산'의 Node.JS 버전입니다. Chil.JS를 서비스하는 웹사이트에서는 역원이 되는 1281년부터 1654년까지의 계산 결과를 출력해 줍니다.
보기 좋게 CSS를 입힌 페이지 뷰와 사용하기 좋게 자른 Raw Data에 모두 접근하실 수 있습니다.

현재는 칠정산내편 중 "역일" 챕터의 간단한 계산만을 수행할 수 있습니다.

## 1.1 Raw Data 상세 설명

### 1.1.1 Calendar

```
{
    "year":"1447",
    "calendar":[
        {
            "Month":"1月",
            "Date":"1日",
            "JulianDay":2249583.125,
            "GanJi":["甲子"],
            "Ms":-16502778000000,
            "Timezone":"1447/01/18(月) 23:27",
            "event":[{
                "Name":"1月 朔",
                "mmmm":650
            }],
            "OHaeng":"土",
            "color":"To"
        }, {
            ...
        }
    ]
}
```

| 데이터 | 설명 |
|---|---|
| year | 연도 |
| calendar | 매일의 JSON 데이터를 저장하는 배열 |
| calendar[i].Month | 월 |
| calendar[i].Date | 일 |
| calendar[i].JulianDay | 율리우스 적일 |
| calendar[i].GanJi | 일진 |
| calendar[i].Ms | 1970년 1월 1일 자정을 기준으로 한 밀리초 |
| calendar[i].Timezone | 위 밀리초를 바탕으로 자바스크립트 Data 모듈로 계산한 서력 연월일(현재 요일 빼고 다 틀림) |
| calendar[i].event | 그날 있을 현상 |
| calendar[i].event.Name | 현상의 이름 |
| calendar[i].event.mmmm | 현상이 일어날 시각(1일 = 10000분 단위) |
| calendar[i].OHaeng | 오행용사 |
| calendar[i].color | CSS 출력용 className |

### 1.1.2 Almanac

```
{
    "year":"1447",
    "almanac":[{
        "MonthIndex":1,
        "MonthName":"1月",
        "MonthLength":"小",
        "Sak":{
            "JulianDay":2249583.1900043185,
            "GanJi":"甲子",
            "mmmm":650,
            "Ms":-16502772383627,
            "Timezone":"1447/01/19(火) 01:01"
        },
        "SangHyeon":{
            "JulianDay":2249590.537449332,
            "GanJi":"辛未",
            "mmmm":4124,
            "Ms":-16502137564378,
            "Timezone":"1447/01/26(火) 09:21"
        },
        "Mang":{
            "JulianDay":2249598.5953306183,
            "GanJi":"己卯",
            "mmmm":4703,
            "Ms":-16501441363435,
            "Timezone":"1447/02/03(水) 10:45"
        },
        "HaHyeon":{
            "JulianDay":2249605.838937188,
            "GanJi":"丙戌",
            "mmmm":7139,
            "Ms":-16500815515827,
            "Timezone":"1447/02/10(水) 16:35"
        },
        "JeolGi":{
            "Name":"立春",
            "JulianDay":2249594.0953125,
            "GanJi":"甲戌",
            "mmmm":9703,
            "Ms":-16501830165000,
            "Timezone":"1447/01/29(金) 22:45",
            "Mol":{
                "JulianDay":2249597.125,
                "GanJi":"丁丑",
                "Ms":-16501568400000,
                "Timezone":"1447/02/01(月) 23:27"
            }
        },
        "JungGi":{
            "Name":"雨水",
            "JulianDay":2249609.3137499997,
            "GanJi":"庚寅",
            "mmmm":1887,
            "Ms":-16500515292000,
            "Timezone":"1447/02/14(日) 03:59",
            "Mol":{}
        },
        "Myeol":{
            "JulianDay":2249597.125,
            "GanJi":"丁丑",
            "Ms":-16501568400000,
            "Timezone":"1447/02/01(月) 23:27"
        },
        "LastDay":29,
        "AccDay":29
    },{
        ...
    }]
}
```

| 데이터 | 설명 |
|---|---|
| year | 연도 |
| almanac | 매월의 JSON 데이터를 저장하는 배열 |
| almanac[i].MonthIndex | 해당 달의 순서(윤달이 있어도 그대로 카운트) |
| almanac[i].MonthName | 월 |
| almanac[i].MonthLength | 큰달인지 작은달인지 |
| almanac[i].Sak | 삭 |
| almanac[i].SangHyeon | 상현 |
| almanac[i].Mang | 망 |
| almanac[i].HaHyeon | 하현 |
| almanac[i].JeolGi | 해당 달 절기(그 달에 들어있지 않을 수도 있음) |
| almanac[i].JeolGi.Name | 절기 이름 |
| almanac[i].JeolGi.Mol | 절기 몰일 |
| almanac[i].JungGi | 해당 달 절기(그 달에 들어있지 않을 수도 있음) |
| almanac[i].JungGi.Name | 중기 이름 |
| almanac[i].JungGi.Mol | 중기 몰일 |
| almanac[i].Myeol | 해당 달 멸일 |
| almanac[i].LastDay | 해당 달의 일수 = 말일의 날짜 |
| almanac[i].AccDay | 해당 달 말일까지 쌓인 날짜수 |
|  |  |
| .JulianDay | 율리우스 적일 |
| .GanJi | 일진 |
| .mmmm | 현상이 일어날 시각(1일 = 10000분 단위) |
| .Ms | 1970년 1월 1일 자정을 기준으로 한 밀리초 |
| .Timezone | 위 밀리초를 바탕으로 자바스크립트 Data 모듈로 계산한 서력 연월일(현재 요일 빼고 다 틀림) |