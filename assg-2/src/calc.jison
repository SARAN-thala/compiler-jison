
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
"!"                   return '!'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"PI"                  return 'PI'
"E"                   return 'E'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    var parse = require('./numberToWords.js').parse;
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
        { console.log(parse($$)); }
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
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    ;
