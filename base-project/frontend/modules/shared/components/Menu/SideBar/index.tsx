import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  List,
  ListItem,
  Text
} from '@chakra-ui/react';
import styles from './SideBar.module.scss';

type MenuItem = {
  id: string;
  name: string;
  accessLink: string;
  subMenus?: MenuItem[];
};

export function SideBar(): React.ReactElement {
  const menuItems: MenuItem[] = [
    {
      id: 'user-management',
      name: 'User management',
      accessLink: '/users',
      subMenus: [
        {
          id: 'user-management/administrators',
          name: 'Administrators',
          accessLink: '/users/admin'
        },
        {
          id: 'user-management/accessibilities',
          name: 'Accessibilities',
          accessLink: '/users/accessibilities'
        }
      ]
    },
    {
      id: 'category',
      name: 'Category',
      accessLink: '/category'
    }
  ];

  return (
    <aside className="my-4 ml-4">
      <Box marginX="2rem" marginY="1.5rem">
        <Text align="center" fontSize="lg">
          Admin Dashboard
        </Text>
      </Box>

      <hr className="mb-4" />

      <Box display={{ base: 'none', md: 'block' }}>
        <Accordion allowToggle>
          {menuItems.map(item => {
            return (
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      key={item.id}
                      paddingY="0.675rem"
                      paddingX="1rem"
                      marginBottom="0.375rem"
                      className={`${isExpanded && styles['active-menu']}`}
                    >
                      <Text
                        m={0}
                        fontWeight={isExpanded ? 'semi-bold' : 'light'}
                        align="center"
                      >
                        {item.name}
                      </Text>
                    </AccordionButton>

                    {!!item.subMenus && (
                      <List>
                        {item.subMenus.map(subMenuItem => {
                          return (
                            <AccordionPanel p={0}>
                              <ListItem
                                key={subMenuItem.id}
                                paddingY="0.675rem"
                                paddingX="1rem"
                              >
                                {subMenuItem.name}
                              </ListItem>
                            </AccordionPanel>
                          );
                        })}
                      </List>
                    )}
                  </>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </aside>
  );
}
