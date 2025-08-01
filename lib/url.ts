import qs from "query-string";

interface FormUrlQueryProps {
  param: string;
  key: string;
  value: string;
}
interface removeUrlQueryProps {
  param: string;
  keyRemove: string[];
}


export const formUrlQuery = ({ param, key, value }: FormUrlQueryProps) => {
  const queryString = qs.parse(param);

  queryString[key] = value;
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeUrlQuery = ({ param, keyRemove  }: removeUrlQueryProps) => {
  const queryString = qs.parse(param);

    keyRemove.forEach((key)=>{
    delete queryString[key];
    })

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  },{skipNull: true});

};
