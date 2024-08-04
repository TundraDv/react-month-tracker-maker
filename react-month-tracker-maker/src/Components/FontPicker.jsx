import React, {useState} from "react";
import {Box, List, ListItemButton, ListItem, ListItemText} from "@mui/material"

function FontPicker(fontsList) {
  return (
    <Box>
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2].map((item) => (
          <ListItem key={`item-${item}-${item}`}>
            <ListItemButton>
              <ListItemText primary={`Item ${item}`} />
            </ListItemButton>
          </ListItem>
      ))}
    </List>
    </Box>
  )
}

export default FontPicker;