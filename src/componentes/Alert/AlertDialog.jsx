import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './styles.css';

const AlertDialogDemo = (props) => (
    <AlertDialog.Root open={props.abrir}>
        <AlertDialog.Trigger asChild>
            <button className="Button violet" onClick={() => props.acaoBotao()}>{props.botao}</button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="AlertDialogOverlay" />
            <AlertDialog.Content className="AlertDialogContent">
                <AlertDialog.Title className="AlertDialogTitle">{props.titulo}</AlertDialog.Title>
                <AlertDialog.Description className="AlertDialogDescription">{props.descricao}
                </AlertDialog.Description>
                <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel asChild>
                        <button className="btn btn-danger">Cancelar</button>
                    </AlertDialog.Cancel>
                    {/* <AlertDialog.Action asChild>
                        <button className="btn btn-danger">Yes, delete account</button>
                    </AlertDialog.Action> */}
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
);

export default AlertDialogDemo;
