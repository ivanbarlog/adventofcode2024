const input = `12109832101432101234107652158943210178765892
03078456210145696701218943067654396549456701
54562364345436789874327832107810387630345210
65401875696925210765498017656901234521254321
78078956787814321544567328943217890012189450
69101045698701055432123410812206921983098765
43232132509652566785010569701105435674549056
58943001419143478994321678983210304105678143
67653214328012988765690787894321213289437212
45654301037001089650787096765010034576524301
56789890156121072341256101896654123678915498
43276765243234561212345234987783210569206789
54109854312789870109012345676898765454106543
45610123203650105438721056765609674323287012
54781010154543216521635489832014589210398013
67898543269854107610544376541023008101296323
54987656576765678923455210458782112010387456
23122189983454989012966904349698103465456567
12033078012763210101877813234521098578956798
03944565430887654012109320121034787632347897
87856556021991047121238458945695698961036016
96587432110872338930347567232780087654105125
01498983321265427945656089101091109803234934
32327465456766016859890176232892256712107843
21012334569854105766763245001743343893256765
30503129678945234897854632122654872894349854
45614068798234012656906543213458961783210703
21765878907178723765417891008965450654125612
30854965416069654894328982567872342103054503
48903010325450560761237813450561003276543678
56012321210341981230106504341540214789432189
67329630121212870341012415432634345695321012
78478742198903965494543326998723456786540765
89569653087654654987696547889010567847830874
21052104676501723898587032378765676956921923
32343015685432810767698121459034982349650010
10478723794354903456567030760121061078744567
21569654891263212347450177898267877101233498
32108765430678903038321789783454978715012399
47899834320545676129012876012543269856101087
56938723011230983543903965987650156747801256
40127619654321012652874854107890349832954343
30034508763018723761765543236501212721096501
21065619012349654890101234565432301430787432`;

const matrix = input
  .split("\n")
  .map((row) => row.split("").map((item) => Number(item)));

const ratings = new Array<number>();

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    const value = matrix[y][x];
    if (value !== 0) continue;

    processTrailhead({ x, y });
  }
}
type Coordinate = { x: number; y: number };
function processTrailhead(coordinate: Coordinate) {
  const endCoordinates = seek({
    start: coordinate,
    currentHeight: 0,
    ends: [],
  });

  ratings.push(endCoordinates.length);
}

function toValue(coordinate: Coordinate | null): null | number {
  if (coordinate == null) return null;

  return matrix[coordinate.y][coordinate.x];
}

function seek(props: {
  start: Coordinate;
  currentHeight: number;
  ends: Coordinate[];
}) {
  const leftNodeCoordinate = left(props.start);
  const leftNode = toValue(leftNodeCoordinate);
  const topNodeCoordinate = top(props.start);
  const topNode = toValue(topNodeCoordinate);
  const rightNodeCoordinate = right(props.start);
  const rightNode = toValue(rightNodeCoordinate);
  const bottomNodeCoordinate = bottom(props.start);
  const bottomNode = toValue(bottomNodeCoordinate);

  const nextHeight = props.currentHeight + 1;
  const ends = props.ends;

  if (nextHeight === 10) return [...ends, props.start];

  const nextStep = new Array<Coordinate[]>();

  if (leftNodeCoordinate && leftNode === nextHeight)
    nextStep.push(
      seek({ start: leftNodeCoordinate, currentHeight: nextHeight, ends })
    );
  if (topNodeCoordinate && topNode === nextHeight)
    nextStep.push(
      seek({ start: topNodeCoordinate, currentHeight: nextHeight, ends })
    );
  if (rightNodeCoordinate && rightNode === nextHeight)
    nextStep.push(
      seek({
        start: rightNodeCoordinate,
        currentHeight: nextHeight,
        ends,
      })
    );
  if (bottomNodeCoordinate && bottomNode === nextHeight)
    nextStep.push(
      seek({
        start: bottomNodeCoordinate,
        currentHeight: nextHeight,
        ends,
      })
    );

  return [...ends, ...nextStep.flat()];
}

function isOutOfBound(coordinate: Coordinate): boolean {
  if (coordinate.x < 0) return true;
  if (coordinate.y < 0) return true;
  if (coordinate.x >= matrix[0].length) return true;
  if (coordinate.y >= matrix.length) return true;

  return false;
}

function left(coordinate: Coordinate): Coordinate | null {
  const x = coordinate.x - 1;
  const y = coordinate.y;

  if (isOutOfBound({ x, y })) return null;

  return { x, y };
}

function top(coordinate: Coordinate): Coordinate | null {
  const x = coordinate.x;
  const y = coordinate.y - 1;

  if (isOutOfBound({ x, y })) return null;

  return { x, y };
}

function right(coordinate: Coordinate): Coordinate | null {
  const x = coordinate.x + 1;
  const y = coordinate.y;

  if (isOutOfBound({ x, y })) return null;

  return { x, y };
}

function bottom(coordinate: Coordinate): Coordinate | null {
  const x = coordinate.x;
  const y = coordinate.y + 1;

  if (isOutOfBound({ x, y })) return null;

  return { x, y };
}

const result = ratings.reduce((result, current) => result + current, 0);

console.log({ result });
