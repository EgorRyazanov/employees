import GroupIcon from '@mui/icons-material/Groups';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { EmployeeViews } from '../../../../models/employeeViews';
import { Node as NodeType } from '../../../../models/node';
import { NodeViews } from '../../../../models/nodeVIew';
import { Person } from '../../../../models/person';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { NodeDetailsStore } from '../../../../store/nodeDetails';
import { PersonStore } from '../../../../store/person';
import { TransformOptionStore } from '../../../../store/transformOptions';
import { getNodeTitle } from '../../../../utils/getNodeTitle';
import { typedMemo } from '../../../../utils/typedMemo';
import { Node } from '../Node';
import { PersonModal } from '../PersonModal';
import styles from './HeaderNode.module.scss';

interface NodeComponentProps {
  node: NodeType;
  left: number;
}

const HeaderNodeComponent: FC<NodeComponentProps> = ({ node, left }) => {
  const dispatch = useAppDispatch();
  const paramsOptions = useAppSelector(filtersSelectors.SelectOptionsParams);
  const shouldShowNode = useAppSelector(filtersSelectors.SelectShouldShowAllFields);

  const [isBodyActive, setIsBodyActive] = useState(node.isDisplay);
  const [isNextNodesActive, setIsNextNodesActive] = useState(node.isDisplay);
  const [hasPersonModalOpen, setHasPersonModalOpen] = useState(false);

  useEffect(() => {
    setIsBodyActive(shouldShowNode || node.isDisplay);
    setIsNextNodesActive(shouldShowNode || node.isDisplay);
  }, [shouldShowNode, node]);

  const handlePersonClick = (personId: Person['id']) => {
    setHasPersonModalOpen(true);
    dispatch(PersonStore.thunks.getPersonDetails(personId));
  };

  const handleDropPerson = () => {
    setHasPersonModalOpen(false);
    dispatch(PersonStore.actions.dropPersonDetails());
  };

  const handleMainNodeClick = (mainNode: NodeType) => {
    dispatch(NodeDetailsStore.actions.setNode(mainNode));
  };

  const handleBodyToggle = () => {
    setIsBodyActive(!isBodyActive);
  };

  const handleNextNodeToggle = () => {
    setIsNextNodesActive(!isNextNodesActive);
  };

  const handleMouseEnter = () => {
    dispatch(TransformOptionStore.actions.change({ wheelDisapled: true }));
  };

  const handleMouseLeave = () => {
    dispatch(TransformOptionStore.actions.change({ wheelDisapled: false }));
  };

  return (
    <div className={styles.cardContainer} style={{ left: `${left}px`, position: 'absolute' }}>
      <Box
        onClick={() => handleMainNodeClick(node)}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <Typography>{node.name}</Typography>
        <IconButton
          disableRipple={true}
          sx={{
            width: '16px',
            height: '16px',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          onClick={e => {
            e.stopPropagation();
            handleBodyToggle();
          }}>
          {isBodyActive ? (
            <KeyboardArrowUpIcon sx={{ color: '#000' }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ color: '#000' }} />
          )}
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          border: '1px solid #14191A1F',
          borderRadius: '4px',
          marginBottom: '24px',
          marginTop: '24px',
        }}>
        <Box sx={{ padding: '8px 12px', backgroundColor: '#F6F6F4', borderRight: '1px solid #14191A1F' }}>
          {node.vacancyCount} вакансий
        </Box>
        <Box sx={{ padding: '8px 12px' }}>{node.userCount} чел.</Box>
      </Box>
      {isBodyActive && (
        <>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              marginTop: '24px',
              marginLeft: node.employees.length > 0 || node.next.length > 0 || node.employers.length > 0 ? 0 : '24px',
            }}>
            {(node.employees.length > 0 || node.next.length > 0 || node.employers.length > 0) && (
              <IconButton
                disableRipple={true}
                sx={{
                  width: '16px',
                  height: '16px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                onClick={handleNextNodeToggle}>
                {isNextNodesActive ? (
                  <KeyboardArrowUpIcon sx={{ color: '#000' }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ color: '#000' }} />
                )}
              </IconButton>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <GroupIcon />
              <Box>
                <Typography>{getNodeTitle(node.structureEnum)}</Typography>
                {node.vacancyCount !== 0 && paramsOptions?.nodeViews.includes(NodeViews.Vacancies) && (
                  <Typography sx={{ color: '#A8A19A' }}>{node.vacancyCount} вакансии</Typography>
                )}
              </Box>
            </Box>
          </Box>
          {isNextNodesActive && (
            <Box>
              {(shouldShowNode || paramsOptions?.nodeViews.includes(NodeViews.Employees)) && (
                <>
                  <Box
                    sx={{ maxHeight: '280px', overflowY: 'auto', cursor: 'pointer' }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    {node.employers.map(
                      person =>
                        !person.isVacancy && (
                          <Box
                            onClick={() => handlePersonClick(person.id)}
                            key={person.id}
                            sx={{ padding: '8px 12px', backgroundColor: '#E8F5E9' }}>
                            <Typography>{person.fullName}</Typography>
                            {paramsOptions?.employeeViews.includes(EmployeeViews.Position) && (
                              <Typography sx={{ color: '#A8A19A' }} variant="body2">
                                {person.position}
                              </Typography>
                            )}
                          </Box>
                        ),
                    )}
                  </Box>
                  <Box
                    sx={{ paddingLeft: '16px', maxHeight: '280px', overflowY: 'auto', cursor: 'pointer' }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    {node.employees.map(
                      person =>
                        !person.isVacancy && (
                          <Box
                            onClick={() => handlePersonClick(person.id)}
                            key={person.id}
                            sx={{ padding: '8px 12px' }}>
                            <Typography>{person.fullName}</Typography>
                            {paramsOptions?.employeeViews.includes(EmployeeViews.Position) && (
                              <Typography sx={{ color: '#A8A19A' }} variant="body2">
                                {person.position}
                              </Typography>
                            )}
                          </Box>
                        ),
                    )}
                  </Box>
                </>
              )}
              {node.next.map(nextNode => (
                <Node key={nextNode.id} node={nextNode} space={24} />
              ))}
            </Box>
          )}
          {hasPersonModalOpen && <PersonModal isOpened={hasPersonModalOpen} toggleModal={handleDropPerson} />}
        </>
      )}
    </div>
  );
};

export const HeaderNode = typedMemo(HeaderNodeComponent);
