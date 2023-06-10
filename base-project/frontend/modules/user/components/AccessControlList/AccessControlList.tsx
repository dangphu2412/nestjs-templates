import React, { ReactElement } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Text
} from '@chakra-ui/react';
import { useQueryControlList } from '@/modules/user/hooks/data/useQueryControlList';
import { useRBACView } from '@/modules/user/hooks/state/useRBACView';
import { useMutateSaveRoles } from '@/modules/user/hooks/data/useMutateSaveRoles';
import { FullLoader } from '@/modules/shared/components/Loader/Full/FullLoader';
import { ContentHeader } from '@/modules/shared/components/Header/ContentHeader/ContentHeader';
import { useNotify } from '@/modules/shared/hooks/useNotify.hook';

export function AccessControlList(): ReactElement {
  const notify = useNotify();
  const { allRoles } = useQueryControlList();
  const { saveRoles, isLoading } = useMutateSaveRoles();
  const { rbacState, togglePermission, getPermissionMap } =
    useRBACView(allRoles);

  function createSaveRoleHandler(
    roleId: string
  ): React.MouseEventHandler<HTMLButtonElement> {
    return () => {
      const permissionMap = getPermissionMap(roleId);
      const toUpdatePermissions = Object.keys(permissionMap).filter(
        permissionId => permissionMap[permissionId].canAccess
      );

      saveRoles(
        {
          id: roleId,
          rights: toUpdatePermissions
        },
        {
          onSuccess: () => {
            notify({
              title: 'Save role success',
              status: 'success'
            });
          }
        }
      );
    };
  }

  function createCheckboxOnChangeHandler(
    roleId: string,
    permissionId: string
  ): (event: React.ChangeEvent<HTMLInputElement>) => void {
    return () => togglePermission(roleId, permissionId);
  }

  if (!allRoles) {
    return <></>;
  }

  return (
    <>
      <div className="px-6 pt-6">
        <ContentHeader
          main={'Access Rights management'}
          brief={'Where you manipulate application access rights'}
        />
      </div>

      <Accordion defaultIndex={[0]} allowMultiple className="py-2 px-6">
        {isLoading && <FullLoader />}

        {Object.keys(rbacState).map(roleId => {
          const {
            name,
            description,
            isEditable,
            permissions: rights
          } = rbacState[roleId];

          return (
            <AccordionItem borderY="none" key={name}>
              <AccordionButton>
                <Text fontSize="md" fontWeight="semibold">
                  <AccordionIcon />
                  {name}
                </Text>
              </AccordionButton>

              <AccordionPanel ml={6} pb={4}>
                <Text fontSize="sm" fontWeight="light">
                  {description}
                </Text>

                <Flex justifyContent="space-between" className="pb-2">
                  <Text my="1rem" fontSize="md" fontWeight="semibold">
                    Permissions
                  </Text>

                  <Button
                    disabled={!isEditable}
                    onClick={createSaveRoleHandler(roleId)}
                  >
                    Save
                  </Button>
                </Flex>

                <Grid
                  templateColumns="repeat(2, 1fr)"
                  justifyContent="space-between"
                  gap={6}
                >
                  {Object.keys(rights).map(permissionId => {
                    const {
                      name: permissionName,
                      description: permissionDescription,
                      canAccess
                    } = rights[permissionId];

                    return (
                      <React.Fragment key={permissionName}>
                        <Checkbox
                          defaultChecked={canAccess}
                          onChange={createCheckboxOnChangeHandler(
                            roleId,
                            permissionId
                          )}
                          disabled={!isEditable}
                        >
                          {permissionName}
                        </Checkbox>
                        <Text fontSize="sm">{permissionDescription}</Text>
                      </React.Fragment>
                    );
                  })}
                </Grid>
              </AccordionPanel>

              <Divider />
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
