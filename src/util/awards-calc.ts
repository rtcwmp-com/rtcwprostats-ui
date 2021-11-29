import { IStatsResponse, IPlayerStatsDictionary, IPlayerStats } from "../api/types";


/* How to extend this
1. Create a function like calc_something_values(players)
       return shoud be a dictionary of {alias:value, alias2:value2}
2. Plug the returned dictionary into the metrics
       metrics["Something"] =  calc_terminator_values(players);
*/



function convert_statsall_to_players(stats: IStatsResponse) {
    let players: { [name: string]: any } = {};
    // console.log(stats);
    stats.statsall.map((player: IPlayerStatsDictionary) => {
        let alias = Object.values(player)[0].alias;
        players[alias] = Object.values(player)[0];  
    })
    return players
}

function calc_best_medic_values(players: { [name: string]: any }) {
    let dict_: { [name: string]: any } = {};

    for (const [alias, stat] of Object.entries(players) as any) {
        dict_[alias] = stat["categories"]['revives'] + stat["categories"]['healthgiven']/4 + stat["categories"]['kills']/3;
      }
    return dict_
}

function calc_best_engineer_values(players: { [name: string]: any }) {
    let dict_: { [name: string]: any } = {};

    for (const [alias, stat] of Object.entries(players) as any) {
        dict_[alias] = stat["categories"]["dyn_planted"] + stat["categories"]["dyn_defused"];
      }
    return dict_
}

function calc_terminator_values(players: { [name: string]: any }) {
    let dict_: { [name: string]: any } = {};

    for (const [alias, stat] of Object.entries(players) as any) {
        if (alias in dict_) {
            dict_[alias] += stat["categories"]["kills"];
        }
        else {
            dict_[alias] = stat["categories"]["kills"];
        }
      }
    return dict_
}

function biggest_values(metrics: { [name: string]: any }) {
    let max_values: { [name: string]: any } = {};

    for (const [metric, dict_] of Object.entries(metrics) as any) {
        max_values[metric] = Object.values(dict_).reduce((a, b) => Math.max(a as number, b as number));
        // console.log(metric + " top value is " + Object.values(dict_).reduce((a, b) => Math.max(a, b)))
      }
    return max_values
}

function keys_of_biggest_values(metrics: any, max_values: any) {
    let award_list: { [name: string]: any } = {};
    for (const [metric, all_values] of Object.entries(metrics) as any) {
        award_list[metric] = {}
        for (const [alias, value] of Object.entries(all_values) as any) {
            if (value == max_values[metric] && max_values[metric] > 0) {
                  award_list[metric][alias] = value;
            }
        }
    }
    return award_list;
}

export const deriveAwardsfromStats = (stats: IStatsResponse) => {
    let players = convert_statsall_to_players(stats);

    let metrics: { [name: string]: any } = {};
    metrics["Best Medic"] = calc_best_medic_values(players);
    metrics["Best Engineer"] =  calc_best_engineer_values(players);
    metrics["Terminator"] =  calc_terminator_values(players);

    let maxValues = biggest_values(metrics);
    let awardList = keys_of_biggest_values(metrics, maxValues)

    return awardList
};

