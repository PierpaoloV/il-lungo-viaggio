export type InkChoice = {
  index: number;
  text: string;
  tags?: string[] | null;
};

export type InkVariableValue = string | number | boolean | null;

export type InkVariablesState = {
  /** Legge una variabile globale ink (un flag). */
  $(name: string): InkVariableValue;
  /** Scrive una variabile globale ink. Deve essere dichiarata con VAR nello story. */
  $(name: string, value: InkVariableValue): void;
  GlobalVariableExistsWithName(name: string): boolean;
};

export type InkStoryState = {
  ToJson(indented?: boolean): string;
  LoadJson(json: string): void;
};

export type InkStory = {
  canContinue: boolean;
  Continue(): string;
  currentTags: string[] | null;
  currentChoices: InkChoice[];
  ChooseChoiceIndex(index: number): void;
  /** Salta a un knot per nome (usato nei test per posizionare lo stato). */
  ChoosePathString(path: string, resetCallstack?: boolean): void;
  readonly state: InkStoryState;
  readonly variablesState: InkVariablesState;
};
