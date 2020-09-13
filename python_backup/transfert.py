#!/usr/bin/python3
#coding:utf-8

# Transfert les données d'un dossier précis vers un autre dossier précis, 
# Efface les données dans le dossier de destination auparavant,
# En fenêtre avec Tkinter

import subprocess
import os
from threading import Thread

from tkinter import *
import tkinter.ttk as ttk

DIR_TO_BACKUP = {
    "<Nom_1>" : "<indiquer le chemin du répertoire>",
    "<Nom_2>" : "<indiquer le chemin du répertoire>",
    "<Nom_3>" : "<indiquer le chemin du répertoire>",
}

BACKUP_DEST = {
    "<Nom_destination_1>" : "<indiquer le chemin du répertoire>",
    "<Nom_destination_2>" : "<indiquer le chemin du répertoire>",
    "<Nom_destination_3>" : "<indiquer le chemin du répertoire>",
}


class Fenetre:
    def __init__(self, master, title):
        self.master = master
        master.title(title)
        master.geometry('1000x440')

        # Destination de la sauvegarde:
        labelDestination = Label(master, text = "Destination sauvegarde")
        labelDestination.grid(row=0, column=0, sticky=W)

        listeDestination= list(BACKUP_DEST.keys())

        self.listeDestination = ttk.Combobox(master, values=listeDestination)
        
        self.listeDestination.current(0)
        self.listeDestination.grid(row=1, column=0, sticky=W)

        # Répertoire à sauvegarder:
        labelRepertoire = Label(master, text = "Répertoire à sauvegarder")
        labelRepertoire.grid(row=0, column=1, sticky=W)

        listeRepertoire = list(DIR_TO_BACKUP.keys())

        self.listeRepertoire = ttk.Combobox(master, values=listeRepertoire)
        
        self.listeRepertoire.current(0)
        self.listeRepertoire.grid(row=1, column=1, sticky=W)


        # Affichage info avec scrollbar
        self.scrollbar = Scrollbar(master, width=20)
        self.scrollbar.grid(row=2, column=3, sticky=NS)
        self.cadre_sup = Listbox(master, yscrollcommand=self.scrollbar.set, width=120, height=20)
        self.cadre_sup.grid(row=2, column=0, columnspan=3, sticky=NSEW)
        self.scrollbar.config(command=self.cadre_sup.yview)
        
        # Les boutons
        self.button_quit = Button(self.master, text='Quitter', command=exit)
        self.button_quit.grid(row=3, column=2, sticky=W)
        self.button_ok = Button(self.master, text='GO', command=lambda:progress(self))
        self.button_ok.grid(row=3, column=1, sticky=E)

        # La barre de progression
        self.progressbar = ttk.Progressbar(master, orient=HORIZONTAL, mode='indeterminate')
        self.progressbar.grid(row=3, column=0, sticky=EW)


class Backup(Thread):
    def __init__(self, fenetre):
        Thread.__init__(self)
        self.fenetre = fenetre

    def run(self):
        fenetre = self.fenetre
        cadre = fenetre.cadre_sup
        # progressbar
        fenetre.progressbar.start()

        # Déclaration des variables
        destination = fenetre.listeDestination.get()
        source = fenetre.listeRepertoire.get()

        #--------------------Préparation répertoire de destination--------------------------------
        # On supprime dossiers et fichiers dans le répertoire de destination.

        cadre.insert(END, "##### On supprime les dossiers et fichiers sur le serveur ####")
        rm_cmd = "rm -r {}*".format(BACKUP_DEST[destination])
        cadre.insert(END, "Exécution de : {}".format(rm_cmd))

        try:
            with subprocess.Popen(rm_cmd, shell=True, stderr=subprocess.PIPE, text=True, bufsize=1) as sub:
                for line in sub.stderr:
                    cadre.insert(END, "{}\n".format(line))
            cadre.insert(END, "OK")
            
        except:
            cadre.insert(END, "/!\\ Erreur au moment de supprimer les dossiers et fichiers /!\\")

        ####################### on lance la copie #########################

        cp_cmd = "cp -r {}* {}".format(DIR_TO_BACKUP[source], BACKUP_DEST[destination])
        cadre.insert(END, "############ On copie les fichiers et dossiers ##########")
        
        cadre.insert(END, "Exécution de : {}".format(cp_cmd))

        try:
            with subprocess.Popen(cp_cmd, shell=True, stderr=subprocess.PIPE, universal_newlines=True) as sub:
                for line in sub.stderr:
                    cadre.insert(END, "{}".format(line))
                cadre.insert(END, "Fin copie")

        except:
            cadre.insert(END, "/!\\ Rien de copier /!\\")
        
        cadre.insert(END, "##### FIN DES OPERATIONS ####")

        # Stop progressbar
        fenetre.progressbar.stop()


        

def progress(fenetre):
    # Thread pour l'affichage
    thread_1 = Backup(fenetre)
    thread_1.start()
    return thread_1




if __name__ == "__main__":

    # Création de la fenêtre:

    root = Tk()
    fenetre_1 = Fenetre(root, 'Backup')
    
    root.mainloop()
    thread_1.join()
