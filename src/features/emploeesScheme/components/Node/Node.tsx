import { Box, Divider, IconButton, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GroupIcon from '@mui/icons-material/Group';

import { typedMemo } from '../../../../utils/typedMemo';
import { Node as NodeType } from '../../../../models/node';
import { TransformOptionStore } from '../../../../store/transformOptions';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { PersonStore } from '../../../../store/person';
import { PersonModal } from '../PersonModal';
import { Person } from '../../../../models/person';
import { NodeDetailsModal } from '../NodeDetailsModal/NodeDetailsModal';
import { filtersSelectors } from '../../../../store/filters/selectors';
import { NodeViews } from '../../../../models/nodeVIew';
import { EmployeeViews } from '../../../../models/employeeViews';
import { getNodeTitle } from '../../../../utils/getNodeTitle';

interface NodeComponentProps {
  node: NodeType;
  activePersonId?: Person['id'];
  space?: number;
}

const NodeComponent: FC<NodeComponentProps> = ({ node, space, activePersonId }) => {
  const dispatch = useAppDispatch();
  const paramsOptions = useAppSelector(filtersSelectors.SelectOptionsParams);
  const shouldShowNode = useAppSelector(filtersSelectors.SelectShouldShowAllFields);

  const [isActive, setIsActive] = useState(node.isDisplay);
  const [hasPersonModalOpen, setHasPersonModalOpen] = useState(false);
  const [hasMainNodeModalOpen, setHasMainNodeModalOpen] = useState(false);
  const [activeMainNode, setActiveMainNode] = useState<NodeType | null>(null);

  useEffect(() => {
    setIsActive(shouldShowNode || node.isDisplay);
  }, [shouldShowNode, node]);

  const handleMainNodeClick = (mainNode: NodeType) => {
    setHasMainNodeModalOpen(true);
    setActiveMainNode(mainNode);
  };

  const handleMainNodeDrop = () => {
    setHasMainNodeModalOpen(false);
    setActiveMainNode(activeMainNode);
  };

  const handlePersonClick = (personId: Person['id']) => {
    setHasPersonModalOpen(true);
    dispatch(PersonStore.thunks.getPersonDetails(personId));
  };

  const handleDropPerson = () => {
    setHasPersonModalOpen(false);
    dispatch(PersonStore.actions.dropPersonDetails());
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleMouseEnter = () => {
    dispatch(TransformOptionStore.actions.change({ wheelDisapled: true }));
  };

  const handleMouseLeave = () => {
    dispatch(TransformOptionStore.actions.change({ wheelDisapled: false }));
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          padding: '12px 0 8px 0',
          paddingLeft: `${space ?? 0}px`,
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
            onClick={handleClick}>
            {isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        )}
        <Box
          onClick={() => handleMainNodeClick(node)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            cursor: 'pointer',
            marginLeft: node.employees.length > 0 || node.next.length > 0 || node.employers.length > 0 ? 0 : '24px',
          }}>
          <GroupIcon sx={{ color: '#A8A19A' }} />
          <Box sx={{ marginBottom: '8px' }}>
            <Typography>{node.name}</Typography>
            {node.vacancyCount !== 0 && paramsOptions?.nodeViews.includes(NodeViews.Vacancies) && (
              <Typography sx={{ color: '#A8A19A' }}>{node.vacancyCount} вакансии</Typography>
            )}
          </Box>
        </Box>
      </Box>
      {isActive && (
        <Box>
          {(shouldShowNode || paramsOptions?.nodeViews.includes(NodeViews.Employees)) && (
            <>
              {(node.employees.length > 0 || node.employers.length > 0) && (
                <Typography sx={{ paddingLeft: `${space ?? 0}px`, marginBottom: '8px' }}>
                  {getNodeTitle(node.structureEnum)}
                </Typography>
              )}
              <Box
                sx={{
                  maxHeight: '280px',
                  overflowY: 'auto',
                  cursor: 'pointer',
                  backgroundColor: '#E8F5E9',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {node.employers.map(
                  person =>
                    !person.isVacancy && (
                      <Box
                        onClick={() => handlePersonClick(person.id)}
                        key={person.id}
                        sx={{
                          paddingLeft: `${space ?? 0}px`,
                          backgroundColor: activePersonId === person.id ? '#cfedf5' : undefined,
                        }}>
                        <Box sx={{ padding: '8px 24px' }}>
                          <Typography>{person.fullName}</Typography>
                          {paramsOptions?.employeeViews.includes(EmployeeViews.Position) && (
                            <Typography sx={{ color: '#A8A19A' }} variant="body2">
                              {person.position}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ),
                )}
              </Box>
              <Box
                sx={{
                  maxHeight: '280px',
                  overflowY: 'auto',
                  cursor: 'pointer',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {node.employees.map(
                  person =>
                    !person.isVacancy && (
                      <Box
                        onClick={() => handlePersonClick(person.id)}
                        key={person.id}
                        sx={{
                          paddingLeft: `${space ?? 0}px`,
                          backgroundColor: activePersonId === person.id ? '#cfedf5' : undefined,
                        }}>
                        <Box sx={{ padding: '8px 24px' }}>
                          <Typography>{person.fullName}</Typography>
                          {paramsOptions?.employeeViews.includes(EmployeeViews.Position) && (
                            <Typography sx={{ color: '#A8A19A' }} variant="body2">
                              {person.position}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ),
                )}
              </Box>
            </>
          )}
          {node.next.map(nextNode => (
            <Node key={nextNode.id} activePersonId={activePersonId} node={nextNode} space={24 + (space ?? 0)} />
          ))}
        </Box>
      )}
      {hasPersonModalOpen && <PersonModal isOpened={hasPersonModalOpen} toggleModal={handleDropPerson} />}
      {hasMainNodeModalOpen && activeMainNode != null && (
        <NodeDetailsModal isOpened={hasMainNodeModalOpen} node={activeMainNode} toggleModal={handleMainNodeDrop} />
      )}
      {node.structureEnum && <Divider sx={{ position: 'absolute', left: 0, right: 0 }} />}
    </>
  );
};

export const Node = typedMemo(NodeComponent);
