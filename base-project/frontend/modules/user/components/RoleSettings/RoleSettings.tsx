import React, { ReactElement, useRef } from 'react';
import { Box, Grid, GridItem, List } from '@chakra-ui/react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useRoleView } from '@/modules/user/hooks/state/useRoleView';
import { useRouter } from 'next/router';
import { normalizeParam } from '@/modules/shared/utils/router.utils';

export function RoleSettings(): ReactElement {
  const handleBarRef = useRef<HTMLDivElement>(null);

  const {
    query: { userId: userIdPathParam }
  } = useRouter();

  const { roleViews, selectionViews, addRole, removeRole } = useRoleView({
    userId: normalizeParam(userIdPathParam)
  });

  function createStopDragHandler(roleId: string) {
    return (e: DraggableEvent, data: DraggableData) => {
      const { right, left, top, bottom } =
        handleBarRef.current!.getBoundingClientRect();
      const {
        right: nodeR,
        left: nodeL,
        top: nodeT,
        bottom: nodeB
      } = data.node.getBoundingClientRect();

      const isInsideBox =
        nodeR < right && nodeL > left && nodeT > top && nodeB < bottom;

      if (isInsideBox) {
        addRole(roleId);
        return;
      }

      removeRole(roleId);
    };
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      <GridItem colSpan={4} w="100%" ref={handleBarRef}>
        <Box border={'1px'} height="400px">
          {roleViews.map(view => {
            return (
              <Draggable
                key={view.name}
                onStop={createStopDragHandler(view.id)}
              >
                <Box
                  cursor={'pointer'}
                  padding={'1rem'}
                  border={'1px'}
                  width="180px"
                  height="40px"
                >
                  {view.name}
                </Box>
              </Draggable>
            );
          })}
        </Box>
      </GridItem>

      <GridItem colSpan={1} w="100%" h="10">
        <List>
          {selectionViews.map(item => {
            return (
              <Draggable
                key={item.name}
                onStop={createStopDragHandler(item.id)}
              >
                <Box
                  cursor={'pointer'}
                  padding={'1rem'}
                  border={'1px'}
                  width="180px"
                  height="40px"
                >
                  {item.name}
                </Box>
              </Draggable>
            );
          })}
        </List>
      </GridItem>
    </Grid>
  );
}
