export enum ElementTypeEnum {
    Text = 'Text',

    Number = 'Number', // Not use
    NumberNormal = 'NumberModel',
    NumberBlank = 'NumberBlank',
    
    Operator = 'Operator',
    Expression = 'Expression', // Not use
    ExpressionNormal = 'ExpressionNormal',
    ExpressionBlank = 'ExpressionBlank',

    Blank = 'Blank',

    Equation = 'Equation',

    Sequence = 'Sequence',

    Problem = 'Problem', // Not use
    ProblemEquation = 'ProblemEquation', // Not use
    ProblemEquationSelectAnswerSingle = 'ProblemEquationSelectAnswerSingle',
    ProblemEquationSelectAnswerMultiple = 'ProblemEquationSelectAnswerMultiple',
    ProblemEquationSelectAnswerSingleSlider = 'ProblemEquationSelectAnswerSingleSlider',
    ProblemFillInTheBlankElementSingle = 'ProblemFillInTheBlankElementSingle',
    ProblemFillInTheBlankElementMultiple = 'ProblemFillInTheBlankElementMultiple',
    ProblemFillInTheBlankMissingPart = 'ProblemFillInTheBlankMissingPart',
    ProblemSequence = 'ProblemSequence', // Not use
    ProblemSequenceFillInTheBlank = 'ProblemSequenceFillInTheBlank',
    ProblemMathThePair = 'ProblemMathThePair'
}