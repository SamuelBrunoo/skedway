export type PatternsNames = 'greenPurple' | 'purpleGreen' | 'greyGrey' | 'darkGrey';

export type Patterns = {
  [K in PatternsNames]: Combination;
}

export type TopColors = 'green' | 'purple' | 'grey' | 'dark';
export type BottomColors = 'purple' | 'green' | 'grey';

type Combination = {
  top: TopColors;
  bottom: BottomColors;
}
