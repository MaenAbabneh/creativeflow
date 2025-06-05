interface Tags {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  title: string;
  description: string;
  _id: string;
  tags: Tags[];
  author: Author;
  createdAt: Data;
  veiws: number;
  upvotes: number;
  answer: number;
}
