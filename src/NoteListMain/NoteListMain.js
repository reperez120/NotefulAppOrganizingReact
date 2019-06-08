import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import AddButton from '../AddButton/AddButton';
import ApiContext from '../ApiContext';
import { getNotesForFolder } from '../notes-helpers';
import NotefulError from '../NotefulError';
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <NotefulError>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <AddButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
          Add Note
            <br />
          </AddButton>
        </div>
        </NotefulError>
      </section>
    )
  }
}
