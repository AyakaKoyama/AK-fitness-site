import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const Alert: React.FC<AlertProps> = ({ isOpen, onClose, onDelete }) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              投稿を削除
            </AlertDialogHeader>

            <AlertDialogBody>削除した投稿は元に戻せません。</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                ml={3}
              >
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
