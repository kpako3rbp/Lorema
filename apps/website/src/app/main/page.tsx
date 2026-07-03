import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Главная',
};

const Main = async () => {
  return <div>Главная страница</div>;
};

export default Main;
