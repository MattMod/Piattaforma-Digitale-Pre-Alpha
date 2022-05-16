/* TODO fix this file!! */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Icon, LinkList, LinkListItem, Navbar } from 'design-react-kit';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formTypes } from '../../pages/administrator/AreaAmministrativa/Entities/utils';
import { useDispatch } from 'react-redux';
import { emptyDetail } from '../../redux/features/areaAmministrativa/detail/detailSlice';
import { useTranslation } from 'react-i18next';

interface ProjectI {
  name?: string;
  id: string;
}

interface MenuDetailsI {
  arrayProjects?: ProjectI[];
}

const MenuDetails: React.FC<MenuDetailsI> = (props) => {
  const { arrayProjects } = props;
  const { firstParam, secondParam } = useParams();
  const navigate = useNavigate();
  const initialValueToogleThree: string[] = [];
  const [isOpenOne, toggleNavScrollOne] = useState(false);
  const [isOpenTwo, toggleNavScrollTwo] = useState(false);
  const [isOpenThree, toggleNavScrollThree] = useState(initialValueToogleThree);
  const location = useLocation();
  const dispatch = useDispatch();

  const getActiveClass = (id: string) =>
    location.hash.includes(id) ? 'font-weight-bold' : '';

  const isFirstOpen = isOpenOne;
  const isSecondOpen = isOpenTwo;

  const handleToogleProject = (projectId: string) => {
    let projects = [...isOpenThree];
    if (projects.includes(projectId)) {
      projects = projects.filter((f) => f !== projectId);
    } else {
      projects.push(projectId);
    }
    toggleNavScrollThree(projects);
  };

  const { t } = useTranslation();

  return (
    <Navbar
      className='inline-menu affix-top'
      cssModule={{ navbar: ' ' }}
      aria-label='Barra di navigazione laterale'
    >
      <LinkList className='menu-details-list'>
        <li>
          <a
            className={`list-item large medium right-icon ${
              isFirstOpen ? '' : 'collapsed'
            } ${getActiveClass('programma')}`}
            //href='#programma'
            data-toggle='collapse'
            aria-expanded='false'
            aria-controls='programma'
            onClick={() => {
              dispatch(emptyDetail());
              navigate(`/area-amministrativa/programmi/${firstParam}`);
              toggleNavScrollOne(!isOpenOne);
            }}
          >
            <span>{t('program')}</span>
            <Icon color='primary' icon='it-expand' aria-hidden size='sm' />
          </a>
          <LinkList
            sublist
            className={isFirstOpen ? 'collapse show' : 'collapse'}
            id='programma'
          >
            <LinkListItem
              //              className={getActiveClass('ente-gestore-programma')}
              onClick={() => {
                dispatch(emptyDetail());
                navigate(
                  `/area-amministrativa/programmi/${firstParam}/ente-gestore-programma`
                );
                /*dispatch(
                  GetEnteGestoreProgrammaDetail(firstParam || '', 'prova')
                );*/
              }}
            >
              {t('program_managing_body')}
            </LinkListItem>
            <LinkListItem
              href='#questionari'
              className={getActiveClass('questionari')}
            >
              {t('surveys')}
            </LinkListItem>
            <li>
              <a
                className={`list-item large medium right-icon ${
                  isSecondOpen ? '' : 'collapsed'
                } ${getActiveClass('progetti')}`}
                // href='#progetti'
                data-toggle='collapse'
                aria-expanded='false'
                aria-controls='progetti'
                onClick={() => {
                  dispatch(emptyDetail());
                  navigate(
                    `/area-amministrativa/programmi/${firstParam}/progetti`
                  );
                  toggleNavScrollTwo(!isOpenTwo);
                }}
              >
                <span>Progetti</span>
                <Icon color='primary' icon='it-expand' aria-hidden size='sm' />
              </a>
              <LinkList
                sublist
                className={isSecondOpen ? 'collapse show' : 'collapse'}
                id='progetti'
              >
                {(arrayProjects || []).map((project, index) => (
                  <li key={index}>
                    <a
                      className={`list-item large medium right-icon ${
                        isOpenThree.includes(project.id) ? '' : 'collapsed'
                      } ${getActiveClass(project.id)}`}
                      //href={'#' + project.id}
                      data-toggle='collapse'
                      aria-expanded='false'
                      aria-controls={project.id}
                      onClick={() => {
                        dispatch(emptyDetail());
                        navigate(
                          `/area-amministrativa/programmi/${firstParam}/progetti/${project.id}`
                        );
                        handleToogleProject(project.id);
                      }}
                    >
                      <span>{project.name}</span>
                      <Icon
                        color='primary'
                        icon='it-expand'
                        aria-hidden
                        size='sm'
                      />
                    </a>
                    <LinkList
                      sublist
                      className={
                        isOpenThree.includes(project.id)
                          ? 'collapse show'
                          : 'collapse'
                      }
                      id={project.id}
                    >
                      <LinkListItem
                        //href={'#' + project.id + '_' + 'ente-gestore-progetto'}
                        className={getActiveClass(
                          project.id + '_' + 'ente-gestore-progetto'
                        )}
                        onClick={() => {
                          dispatch(emptyDetail());
                          navigate(
                            `/area-amministrativa/programmi/${firstParam}/progetti/${
                              secondParam || 'project1'
                            }/${formTypes.ENTI_GESTORE_PROGETTO}`
                          );
                        }}
                      >
                        {t('project_managing_body')}
                      </LinkListItem>
                      <LinkListItem
                        //href={'#' + project.id + '_' + 'enti-partner'}
                        className={getActiveClass(
                          project.id + '_' + 'enti-partner'
                        )}
                        onClick={() => {
                          dispatch(emptyDetail());
                          navigate(
                            `/area-amministrativa/programmi/${firstParam}/progetti/${
                              secondParam || 'project1'
                            }/${formTypes.ENTI_PARTNER}`
                          );
                        }}
                      >
                        {t('partners')}
                      </LinkListItem>
                      <LinkListItem
                        // href={'#' + project.id + '_' + 'sedi'}
                        className={getActiveClass(project.id + '_' + 'sedi')}
                        onClick={() => {
                          dispatch(emptyDetail());
                          navigate(
                            `/area-amministrativa/programmi/${firstParam}/progetti/${
                              secondParam || 'project1'
                            }/${formTypes.SEDI}`
                          );
                        }}
                      >
                        {t('locations')}
                      </LinkListItem>
                    </LinkList>
                  </li>
                ))}

                {/* <li>
                  <a
                    className={`list-item large medium right-icon ${
                      isThirdOpen ? '' : 'collapsed'
                    } ${getActiveClass('progetto2')}`}
                    href={`#progetto2`}
                    data-toggle='collapse'
                    aria-expanded='false'
                    aria-controls='progetto2'
                    onClick={(e) => {
                      e.preventDefault();
                      toggleNavScrollThree(!isOpenThree);
                    }}
                  >
                    <span>Progetto 2</span>
                    <Icon
                      color='primary'
                      icon='it-expand'
                      aria-hidden
                      size='sm'
                    />
                  </a>
                  <LinkList
                    sublist
                    className={isThirdOpen ? 'collapse show' : 'collapse'}
                    id='progetto2'
                  >
                    <LinkListItem
                      href='#ente-gestore-progetto'
                      className={getActiveClass('ente-gestore-progetto')}
                    >
                      Ente gestore di progetto
                    </LinkListItem>
                    <LinkListItem
                      href='#enti-partner'
                      className={getActiveClass('enti-partner')}
                    >
                      Enti partner
                    </LinkListItem>
                    <LinkListItem
                      href='#sedi'
                      key=''
                      className={getActiveClass('sedi')}
                    >
                      Sedi
                    </LinkListItem>
                  </LinkList>
                </li> */}
              </LinkList>
            </li>
          </LinkList>
        </li>
      </LinkList>
    </Navbar>
  );
};

export default MenuDetails;
