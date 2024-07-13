export interface TraitCombination {
    quantity: number;
    traitCombination: {
        treeChoice: string;
        paper: string;
        margins: string;
        format: string;
        background: string;
        texture: string;
        mention: string;
        bark: string;
        threadFlow: string;
        thread: string
    };
    ids: string[];

}

export const mockTraits: TraitCombination[] = [
    {
        quantity: 10,
        traitCombination: {
            treeChoice: "Normal",
            paper: "Black Black",
            margins: "3%",
            format: "Large square",
            background: "Cloud", texture: "Paper",
            mention: "_",
            bark: "Waves", threadFlow: "Ring",
            thread: "Double"
        },
        ids: ['1', '2', '3']
    }]