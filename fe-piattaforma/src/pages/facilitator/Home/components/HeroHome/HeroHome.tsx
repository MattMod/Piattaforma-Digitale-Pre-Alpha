import React, { memo } from 'react';
import {
  CardReadMore,
  Container,
  Hero,
  HeroBackground,
  HeroBody,
  HeroButton,
  HeroTitle,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from 'design-react-kit';
import './heroHome.scss';

const HeroHome = () => {
  return (
    <>
      <Hero overlap>
        <HeroBackground
          src='https://animals.sandiegozoo.org/sites/default/files/2016-08/animals_hero_mountains.jpg'
          title='image title'
          alt='imagealt'
        />
        <HeroBody>
          <HeroTitle tag='h2' className='text-white'>
            {'"La più grande soddisfazione è aiutare gli altri"'.toUpperCase()}
          </HeroTitle>
          <p className='d-none d-lg-block'>
            <strong>Repubblica Digitale</strong> è l’iniziativa strategica
            nazionale che ha l’obiettivo di ridurre il divario digitale e
            promuovere l’educazione sulle tecnologie del futuro, supportando il
            processo di sviluppo del Paese.
          </p>
          <HeroButton color='secondary'>Scopri di più</HeroButton>
        </HeroBody>
      </Hero>
      <Container className='heroHome__hero-container'>
        <Card className='card-bg heroHome__hero-card'>
          <CardBody>
            <CardTitle tag='h3' className='big-heading text-primary'>
              Devi compilare un questionario?
            </CardTitle>
            <CardText className='complementary-1-color-b8'>
              Un futuro più accessibile per tutti è possibile. Ogni giorno stai
              facendo la tua parte per aiutare concretamente gli altri.
            </CardText>
            <div className='d-flex flex-row'>
              <HeroButton color='primary'>
                Compila nuovo questionario
              </HeroButton>
              <CardReadMore
                text='Archivio questionari'
                iconName='it-arrow-right'
                href=''
                className='heroHome__read-more ml-4'
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default memo(HeroHome);
