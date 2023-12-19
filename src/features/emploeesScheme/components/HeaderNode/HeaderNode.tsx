import { Box, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GroupIcon from '@mui/icons-material/Group';

import { typedMemo } from '../../../../utils/typedMemo';
import { Node as NodeType } from '../../../../models/node';
import { Node } from '../Node';
import { useAppDispatch } from '../../../../hooks';
import { TransformOptionStore } from '../../../../store/transformOptions';
import { Person } from '../../../../models/person';
import { PersonModal } from '../PersonModal';
import { PersonStore } from '../../../../store/person';
import styles from './HeaderNode.module.scss';

interface NodeComponentProps {
  node: NodeType;
  left: number;
}

const HeaderNodeComponent: FC<NodeComponentProps> = ({ node, left }) => {
  const dispatch = useAppDispatch();

  const [isBodyActive, setIsBodyActive] = useState(false);
  const [isNextNodesActive, setIsNextNodesActive] = useState(false);
  const [hasPersonModalOpen, setHasPersonModalOpen] = useState(false);

  const handlePersonClick = (personId: Person['id']) => {
    setHasPersonModalOpen(true);
    dispatch(PersonStore.thunks.getPersonDetails(personId));
  };

  const handleDropPerson = () => {
    setHasPersonModalOpen(false);
    dispatch(PersonStore.actions.dropPersonDetails());
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>{node.name}</Typography>
        <IconButton onClick={handleBodyToggle}>
          {isBodyActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
          Брусника.Екатеринбург
        </Box>
        <Box sx={{ padding: '8px 12px' }}>{node.userCount} чел.</Box>
      </Box>
      {isBodyActive && (
        <>
          <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '24px', cursor: 'pointer' }}>
            <IconButton onClick={handleNextNodeToggle}>
              {isNextNodesActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <GroupIcon sx={{ color: '#A8A19A' }} />
              <Box>
                <Typography>Сотрудники в подразделении</Typography>
                {node.vacancyCount !== 0 && (
                  <Typography sx={{ color: '#A8A19A' }}>{node.vacancyCount} вакансии</Typography>
                )}
              </Box>
            </Box>
          </Box>
          {isNextNodesActive && (
            <Box>
              {node.next.map(nextNode => (
                <Node key={nextNode.id} node={nextNode} space={16} />
              ))}
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
                        <Typography sx={{ color: '#A8A19A' }} variant="body2">
                          {person.position}
                        </Typography>
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
                      <Box onClick={() => handlePersonClick(person.id)} key={person.id} sx={{ padding: '8px 12px' }}>
                        <Typography>{person.fullName}</Typography>
                        <Typography sx={{ color: '#A8A19A' }} variant="body2">
                          {person.position}
                        </Typography>
                      </Box>
                    ),
                )}
              </Box>
            </Box>
          )}
          {hasPersonModalOpen && <PersonModal isOpened={hasPersonModalOpen} toggleModal={handleDropPerson} />}
        </>
      )}
    </div>
  );
};

export const HeaderNode = typedMemo(HeaderNodeComponent);
