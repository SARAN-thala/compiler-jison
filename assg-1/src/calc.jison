
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */

%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    var parserTree = require('./parser.js');
%}

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log(parserTree.parse($1)) : print($1);
          return $1; }
    ;

e
    : e '+' e
       {$$ = {left:$1,sym:$2,right:$3};}
    | e '-' e
       {$$ = {left:$1,sym:$2,right:$3};}
    | e '*' e
       {$$ = {left:$1,sym:$2,right:$3};}
    | e '/' e
       {$$ = {left:$1,sym:$2,right:$3};}
    | e '^' e
        {$$ = {left:$1,sym:$2,right:$3};}
    | NUMBER
        {$$ = Number(yytext);}
    ;
