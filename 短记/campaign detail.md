~~~json
{
    "ret": 0,
    "data": {
        // campaign id
        "_id": "6488241d298a3119b12be99e",
        // campaign 名称
        "camPaignName": "fisor-UATCampaign-001(20230613)",
        // 类型
        "type": "用户-新增+**回流**+预约",
        // 区域
        "region": [
            "00"
        ],
        // 预算金额
        "totalUsAmount": 40000,
        // 花费金额
        "endMount": 35000,
        // 花费进度
        "endPercent": 0,
        // 项目简介
        "projectDesc": "fisor-UATCampaign-001(20230613)\n",
        // 状态
        "state": "APPROVED",
        // 目标进度
        "targetProgress": {
            "purposeName": "用户-新增+回流+预约",
            "mainKpiDesc": "项目带来用户数（新增+回流+预约）",
            "originValue": 40000,
            "endValue": 40000,
            "percent": 1
        },
        // 立项结项汇总
        "resources": {
            // 资源code,用于做映射
            "RES002": {
                // 资源名称
                "resourceName": "互联网广告投放-非SEM的效果类",
                // 资源code
                "resourceCode": "RES002",
                "normMap": {
                    // 指标Code
                    "RES002_pullNewBudget": {
                        // 指标名称
                        "normName": "拉新预算额",
                        // 立项初始金额
                        "originValue": 20000,
                        "endValue": 17000,
                        "normPercent": 0.85
                    },
                    "RES002_userLeaderCount": {
                        "normName": "拉新用户数",
                        "originValue": 10000,
                        "endValue": 11000,
                        "normPercent": 1.1
                    },
                    "RES002_LTV-1": {
                        "normName": "LTV-1",
                        "originValue": 1,
                        "endValue": 1.091,
                        "normPercent": 1.091
                    },
                    "RES002_LTV-3": {
                        "normName": "LTV-3",
                        "originValue": 3,
                        "endValue": 3.182,
                        "normPercent": 1.061
                    },
                    "RES002_LTV-7": {
                        "normName": "LTV-7",
                        "originValue": 5,
                        "endValue": 5,
                        "normPercent": 1
                    },
                    "RES002_Keep-2": {
                        "normName": "留存-2",
                        "originValue": 50
                    },
                    "RES002_Keep-3": {
                        "normName": "留存-3",
                        "originValue": 30
                    },
                    "RES002_Keep-7": {
                        "normName": "留存-7",
                        "originValue": 10
                    },
                    "RES002_recallBudget": {
                        "normName": "召回预算额",
                        "originValue": 0,
                        "endValue": 0,
                        "normPercent": 0
                    },
                    "RES002_recallUsers": {
                        "normName": "召回用户数",
                        "originValue": 0,
                        "endValue": 0,
                        "normPercent": 0
                    }
                }
            },
            "RES012": {
                "resourceName": "公关传播",
                "resourceCode": "RES012",
                "normMap": {
                    "RES012_NORM0025": {
                        "normName": "报道量",
                        "originValue": 100,
                        "endValue": 35,
                        "normPercent": 0.35
                    },
                    "RES012_O_9cf29343-ed9f-443c-9d2e-2e74cc93b93c": {
                        "normName": "非负面报道量",
                        "originValue": 80,
                        "endValue": 30,
                        "normPercent": 0.375
                    },
                    "RES012_O_6572f1c1-24f2-4e39-a833-a4f6fb84ef0a": {
                        "normName": "非负面报道率",
                        "originValue": 80,
                        "endValue": 0.857,
                        "normPercent": 0.011
                    },
                    "RES012_NORM0049": {
                        "normName": "曝光量",
                        "endValue": 2500000,
                        "normPercent": 0
                    },
                    "RES012_O_1ee3e262-6eff-4a1b-a8cc-2280c3586869": {
                        "normName": "Unique Monthly Views （UMV）",
                        "endValue": 0,
                        "normPercent": 0
                    }
                }
            },
            "RES009": {
                "resourceName": "活动营销-非赛事",
                "resourceCode": "RES009",
                "normMap": {
                    "RES009_O_399954f5-7c3b-4d4a-91fd-c733acb039cc": {
                        "normName": "参与人数（线上活动类）",
                        "endValue": 2000,
                        "normPercent": 0
                    },
                    "RES009_NORM0020": {
                        "normName": "线下有效到场人数(人)",
                        "endValue": 4500,
                        "normPercent": 0
                    },
                    "RES009_O_905f4304-4a60-4c13-849c-6ee75d9f84bf": {
                        "normName": "曝光量（线上活动类）",
                        "originValue": 100000,
                        "endValue": 20000,
                        "normPercent": 0.2
                    },
                    "RES009_O_9e873d02-7461-44ee-a069-1b79e0786acf": {
                        "normName": "总观看时长（线上活动类）",
                        "endValue": 2000,
                        "normPercent": 0
                    }
                }
            }
        }
    }
}
~~~