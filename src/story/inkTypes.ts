export type InkChoice = {
  index: number;
  text: string;
};

export type InkStory = {
  canContinue: boolean;
  Continue(): string;
  currentChoices: InkChoice[];
  ChooseChoiceIndex(index: number): void;
};
